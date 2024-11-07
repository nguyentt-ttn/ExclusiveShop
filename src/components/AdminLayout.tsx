
import { Link, Outlet } from 'react-router-dom'
import AccessDenied from '../pages/AccessDenied';



const AdminLayout = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
	if (!user || user.role !== "admin") {
		return (
			<>
				<AccessDenied />
				
			</>
		);
	}
  return (
    
    <div>
        
        <div className="container"><header>
   <h1>Hello {user.email}</h1>
    </header>
            <div className="row">
                <div className="col-2 ">
                    <div className="shadow p-2">
                    <ul>
                        <li>
                            <Link to="/admin">Dash Board</Link>
                        </li>
                        <li>
                            <Link to="/admin/products">Products</Link>
                        </li>
                        <li>
                            <Link to="/admin/user-list">Users</Link>
                        </li>
                    </ul></div>
                </div>
                <div className="col-10">
                    <Outlet/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminLayout