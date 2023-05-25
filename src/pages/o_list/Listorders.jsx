import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatableorders from "../../components/datatable_orders/Datatableorders"

const Listorders = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatableorders/>
      </div>
    </div>
  )
}

export default Listorders;