
import { Link } from 'react-router-dom'
import logoE from '../imgs/Exclusive-designstyle-exclusive-m.png'
const Footer = () => {
  return (
    <div>
     <div className="footer">
        <div className="container">
            <div className="row">
           
                <div className="col-md-3">
                <img src={logoE} width={200} alt="" />
                    <form> 
                        <div className="form-group">
                            <label htmlFor="emailSubscribe">Subscribe</label>
                            <input type="email" className="form-control" id="emailSubscribe" placeholder="Enter your email"/>
                        </div>
                      
                    </form>
                </div>
                <div className="col-md-3">
                    <h5>Hỗ trợ</h5>
                    <p>Ngõ 80, phường Xuân Phương, quận Nam Từ Liêm, thành phố Hà Nội</p>
                    <p>nguyenttph45116@fpt.edu.vn</p>
                    <p>0985125849</p>
                </div>
                <div className="col-md-3">
                    <h5>Account</h5>
                    <ul className="list-unstyled">
                        <li><Link to="/#"className="text-white">My Account</Link></li>
                        <li><Link to="/login"className="text-white">Login</Link> / <Link to="/register">Register</Link></li>
                        <li><Link to="/cart"className="text-white">Cart</Link></li>
                        <li><Link to="/#"className="text-white">Wishlist</Link></li>
                    </ul>
                </div>
                <div className="col-md-3">
                    <h5>Quick Link</h5>
                    <ul className="list-unstyled">
                        <li><Link to="/#"className="text-white">Privacy Policy</Link></li>
                        <li><Link to="/#"className="text-white">Terms Of Use</Link></li>
                        <li><Link to="/#"className="text-white">FAQ</Link></li>
                        <li><Link to="/#"className="text-white">Contact</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Footer
