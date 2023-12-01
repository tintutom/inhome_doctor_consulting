
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from doctors.serializers import DoctorAdditionalDetailsSerializer,DoctorSlotSerializer
from .authentication import check_user
from rest_framework.decorators import api_view
import jwt
import json
import base64
from doctors.models import Doctorinfo, Specialization,DoctorSlot,DoctorAdditionalDetails
# from doctors.serializers import Doctorinfo_Serializer
from users.serializers import BookingSerializer,UserAddressSerializer,User_Serializer
from users.models import Payments,User,UserAddress
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import Doctorinfo_Serializer
from .models import Doctorinfo
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import Doctorinfo_Serializer


class DoctorInfoView(APIView):
    def get(self, request,doctor_id, *args, **kwargs):
        doctor_info_instance = Doctorinfo.objects.get(id=doctor_id)  # You need to fetch a specific instance or queryset based on your requirements
        serializer = Doctorinfo_Serializer(doctor_info_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

class Sign_up(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request ):

        try:
            name = request.data['name']
            username = request.data['username']
            admin_position = request.data['admin_position']
            specialization = request.data['specialization']
            phone = request.data['phone']
            email = request.data['email']
            description = request.data['description']
            password = request.data['password']
            image = request.data.get('image', None)
            specialization = get_object_or_404(Specialization, specialization=specialization)
            
        
        except KeyError as e:
            return Response({'status': f'Missing field: {e}'})
        
        check_hospital = Doctorinfo.objects.all()

        for i in check_hospital:
            if i.email == email:
                return Response({'status': 'Email is already Exist'})
            elif i.username == username:
                return Response({'status': 'Username is already Exist'})
            elif i.phone == phone:
                return Response({'status': 'Phone Number is already Exist'})

        hospital = Doctorinfo.objects.create(
            name=name,
            username=username,
            admin_position=admin_position,
            specialization=specialization,
            phone=phone,
            email=email,
            description=description,
            password=password,
            image=image,
        )

        hospital.save()
        send_mail('New Hospital Account Created',
                'Hello Admin, a new hospital is registered. The hospital name is {}. http://localhost:3000/cadmin/hospital'.format(name),
                'settings.EMAIL_HOST_USER',
                ['tintutom2000@gmail.com'],
                fail_silently=False
                )
        
        return Response({'status': 'Success'})


class Login(APIView):
    def post(self, request):
        try:
            username = request.data['username']
            password = request.data['password']
        except:
            return Response('Please give all details')
        user = Doctorinfo.objects.filter(username=username).first()
        if user is not None:
            id = user.id
            response = check_user(user, password, username, id)
            if response is not None:
                return response
        return Response('Authentication Failed')



class DoctorLogout(APIView):
    def get(self, request):
        response = Response({'status': 'success'})
        response.delete_cookie('jwt')
        return response
    
@api_view(['POST'])
def verifyToken(request):
    token = request.data.get('token')
    decoded = jwt.decode(token, 'secret', algorithms='HS256')
    # Decode  payload
    decoded_bytes = base64.b64decode(decoded['payload'])
    #  byte string to unicode string
    decoded_str = decoded_bytes.decode('utf-8')
    decoded1 = json.loads(decoded_str)  # Parse JSON string as dictionary
    user = Doctorinfo.objects.get("hii",email=decoded1.get('email'))

    if user:
        return Response({'username': user.name, 'id': user.id})
    else:
        return Response({'status': 'Token InValid'})


class DoctorAdditionalDetailsAPIView(APIView):
    def post(self, request, doctor_id, format=None):
        try:
            # Retrieve the doctor instance
            # doctor_instance = Doctorinfo.objects.get(id=doctor_id)
            doctor_instance = get_object_or_404(Doctorinfo, id=doctor_id)
        except Doctorinfo.DoesNotExist:
            return Response({'success': False, 'message': 'Doctor not found'}, status=status.HTTP_404_NOT_FOUND)

        # Deserialize the request data
        serializer = DoctorAdditionalDetailsSerializer(data=request.data)

        if serializer.is_valid():
            # Save DoctorAdditionalDetails instance with the related doctor
            serializer.save(doctor=doctor_instance)
            return Response({'success': True, 'message': 'Doctor additional details added successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# doctor info updation view
class DoctorInfoUpdateAPIView(APIView):
    def get(self, request, doctor_id):
        try:
            doctor = Doctorinfo.objects.get(id=doctor_id)
        except Doctorinfo.DoesNotExist:
            return Response({'error': 'Doctor not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = Doctorinfo_Serializer(doctor)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, doctor_id):
        try:
            doctor = Doctorinfo.objects.get(id=doctor_id)
        except Doctorinfo.DoesNotExist:
            return Response({'error': 'Doctor not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = Doctorinfo_Serializer(doctor, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddDoctorSlot(APIView):
    def post(self, request, doctor_id):
        try:
            doctor = get_object_or_404(Doctorinfo, id=doctor_id)
            date = request.data['date']
            start_time = request.data['start_time']
            end_time = request.data['end_time']
        except KeyError as e:
            return Response({'status': f'Missing field: {e}'})

        # Check for duplicate slot
        duplicate_slot = DoctorSlot.objects.filter(doctor=doctor, date=date, start_time=start_time, end_time=end_time)
        if duplicate_slot.exists():
            return Response({'status': 'Slot already exists for this doctor on the specified date and time.'})

        # Create and save the new slot
        slot = DoctorSlot(doctor=doctor, date=date, start_time=start_time, end_time=end_time)
        slot.save()

        # You can use a serializer to return the slot details in the response if needed
        serializer = DoctorSlotSerializer(slot)

        return Response({'status': 'Slot added successfully', 'slot': serializer.data})



class DoctorSlotsList(APIView):
    def get(self, request, doctor_id):
        doctor = get_object_or_404(Doctorinfo, id=doctor_id)
        
        # Fetch all slots for the specified doctor
        slots = DoctorSlot.objects.filter(doctor=doctor)
        
        # Serialize the slots
        serializer = DoctorSlotSerializer(slots, many=True)
        
        return Response(serializer.data)
    
    #  path('availability-list/<str:email>/', ProfessionalAvailabilityView.as_view(), name='availability-list'),
   
# class ProfessionalAvailabilityView(APIView):
#     def get(self, request, doctor_id):
#         try:
#             print (doctor_id,"emailllllllllllllll")
#             doctor = Doctorinfo.objects.get(id=doctor_id)
#             doctor = DoctorAdditionalDetails.objects.get(doctor=doctor)
#             availabilities = DoctorSlot.objects.filter(doctor=doctor)
#             serializer = ProfessionalAvailabilitySerializer(availabilities, many=True)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         except Doctorinfo.DoesNotExist:
#             return Response({"error": "Professional not found."}, status=status.HTTP_404_NOT_FOUND)

class UpdateDoctorSlot(APIView):
    def put(self, request, doctor_id, slot_id):
        doctor = get_object_or_404(Doctorinfo, id=doctor_id)
        slot = get_object_or_404(DoctorSlot, id=slot_id, doctor=doctor)

        try:
            date = request.data['date']
            start_time = request.data['start_time']
            end_time = request.data['end_time']
        except KeyError as e:
            return Response({'status': f'Missing field: {e}'})

        # Check for duplicate slot
        duplicate_slot = DoctorSlot.objects.filter(doctor=doctor, date=date, start_time=start_time, end_time=end_time).exclude(id=slot_id)
        if duplicate_slot.exists():
            return Response({'status': 'Slot already exists for this doctor on the specified date and time.'})

        # Update the slot
        slot.date = date
        slot.start_time = start_time
        slot.end_time = end_time
        slot.save()

        # Serialize the updated slot
        serializer = DoctorSlotSerializer(slot)

        return Response({'status': 'Slot updated successfully', 'slot': serializer.data})

class DeleteDoctorSlot(APIView):
    def delete(self, request, doctor_id, slot_id):
        doctor = get_object_or_404(Doctorinfo, id=doctor_id)
        slot = get_object_or_404(DoctorSlot, id=slot_id, doctor=doctor)

        # Delete the slot
        slot.delete()

        return Response({'status': 'Slot deleted successfully'})

class UpcomingAppointmentsView(APIView):
    def get(self, request, doctor_id):  
        try:
            # Retrieve all appointments for the user
            user_appointments = Payments.objects.filter(doctor_id=doctor_id, payment=True)

            # Serialize the data
            serializer = BookingSerializer(user_appointments, many=True)

            # Fetch corresponding doctor and user data
            appointments_data = serializer.data
            for appointment_data in appointments_data:
                doctor_id = appointment_data['doctor']
                user_id = appointment_data['user']

                doctor_instance = Doctorinfo.objects.get(id=doctor_id)
                user_instance = User.objects.get(id=user_id)
                user_address_instance = UserAddress.objects.get(user=user_instance)

                doctor_serializer = Doctorinfo_Serializer(doctor_instance)
                user_serializer = User_Serializer(user_instance)
                user_address_serializer = UserAddressSerializer(user_address_instance)

                appointment_data['doctor'] = doctor_serializer.data
                appointment_data['user'] = user_serializer.data
                appointment_data['user']['address'] = user_address_serializer.data


            return Response(appointments_data, status=status.HTTP_200_OK)
        except Payments.DoesNotExist:
            return Response({"error": "Payments not found"}, status=status.HTTP_404_NOT_FOUND)



# # class Doctor_add(APIView):
# #     def post(self, request):

# #         name = request.data['name']
# #         experience = request.data['experience']
# #         department_id = request.data['department_id']
# #         department = Department.objects.get(id=department_id)
# #         hospital_id = request.data['hospital_id']
# #         hospital = Hospital.objects.get(id=hospital_id)
# #         fee = request.data['fee']
# #         tokens = request.data['tokens']

# #         token = [int(x) for x in tokens.split(',')]

# #         doctor = Doctor.objects.create(
# #             name='Dr.'+ name,
# #             experience=experience,
# #             hospital=hospital,
# #             department=department,
# #             fee=fee,
# #             tokens=token,

# #         )
# #         doctor.save()
# #         return Response("Doctor Created")


# # @api_view(['GET'])
# # def Doctor_details(request, hospital_id):
# #     doctors = Doctor.objects.filter(hospital_id=hospital_id).order_by('id')
# #     serializer = Doctor_serializer(doctors, many=True)
# #     return Response(serializer.data)


# # @api_view(['GET'])
# # def Counts(request, id):
# #     doctors = Doctor.objects.filter(hospital_id=id).count()
# #     return Response({'doctors': doctors})


# # @api_view(['PUT'])
# # def Doctor_availablity(request, id):
# #     doctor = Doctor.objects.get(id=id)
# #     if doctor.is_available:
# #         doctor.is_available = False
# #         doctor.save()
# #     else:
# #         doctor.is_available = True
# #         doctor.save()
# #     return Response(" Availablity Updated")




# # @api_view(['GET'])
# # def appointments(request,id):
# #     appointment = Booking.objects.filter(hospital_id=id)
# #     serializer = Booking_Serializer(appointment,many=True)
# #     return Response(serializer.data)