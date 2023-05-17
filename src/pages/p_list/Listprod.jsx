import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatableprod from "../../components/datatable_products/Datatableprod"

const Listprod = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatableprod/>
      </div>
    </div>
  )
}

export default Listprod;