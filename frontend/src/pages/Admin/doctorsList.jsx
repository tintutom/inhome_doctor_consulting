import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { mediaUrl } from "../../utils/Constants";
import { Link } from "react-router-dom";
import {
  adminHospital,
  approveHospital,
  deleteHospital,
} from "../../utils/Constants";
import Swal from "sweetalert2";
import Switch from "@material-ui/core/Switch";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";

function Doctorlist() {
  const [hospital, setHospital] = useState([]);
  const [records, setRecords] = useState([]);
  useEffect(() => {
    getHospitallist();
  }, []);
  const getHospitallist = () => {
    axios.get(adminHospital).then((response) => {
      setHospital(response.data);
      const data = response.data.map((doctorinfo, index) => ({
        slno: index + 1,
        id: doctorinfo.id,
        name: doctorinfo.name,
        username: doctorinfo.username,
        phone: doctorinfo.phone,
        image: doctorinfo.image,
        approve: doctorinfo.is_approved ? "True" : "False",
      }));
  
      data.forEach((item) => {
        console.log("Image path:", item.image); 
        console.log("name", item.name); 
      });
  
      setRecords(data);
    });
  };
  
  const hospital_approval = (id) => {
    axios
      .put(`${approveHospital}/${id}`)
      .then((response) => {
        getHospitallist();
        toast.success("Updated", {
          autoClose: 20000,
        });
      })
      .catch((e) => {
        console.log("error");
      });
  };

  const deleteHosp = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${deleteHospital}/${id}`)
          .then((res) => {
            getHospitallist();

            toast.success("Deleted", {
              autoClose: 20000,
            });
          })
          .catch((err) => {
            toast.error("Not Deleted", {
              autoClose: 20000,
            });
          });
      }
    });
  };

  const columns = [
    {
      name: "SL.NO",
      selector: (row) => row.slno,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => row.username,
    },
    {
      name: "Image",
      cell: (row) => {
        return <img src={`${mediaUrl}${row.image}`} alt={row.name} width="50" />;
      },
    },
    {
      name: "Approved Status",
      selector: (row) => row.approve,
    },
    {
      name: "Aprpove/Disapprove",
      cell: (row) =>
        row.approve === "True" ? (
          <Switch
            onClick={() => hospital_approval(row.id)}
            defaultChecked
            color="default"
          />
        ) : (
          <Switch onClick={() => hospital_approval(row.id)} color="default" />
        ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <Link>
          <div onClick={() => deleteHosp(row.id)} className="hospital_delete">
            <FaTrash />
          </div>
        </Link>
      ),
    },
  ];
  function handleFilter(e) {
    const newData = records.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  return (
    <>

    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-10">
          <div className="text-end">
            <input
              type="text"
              placeholder="Search Doctors"
              onChange={handleFilter}
            />
          </div>
          <DataTable columns={columns} data={records} pagination></DataTable>
        </div>
      </div>
    </div>
    </>
  );
}
export default Doctorlist;