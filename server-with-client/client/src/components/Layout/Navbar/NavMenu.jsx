import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router";
import { getUserData } from "../../../redux/actions/authActions";

const NavMenu = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  
  const { user } = useSelector((state) => state.auth);

  const closeMenu = () => {
    const menuEl = document.getElementById("navbarTogglerDemo01");
    if (menuEl && menuEl.classList.contains("show")) {
      
      menuEl.classList.remove("show");
      
      const togglerBtn = document.querySelector(".navbar-toggler");
      if (togglerBtn) {
        togglerBtn.setAttribute("aria-expanded", "false");
        togglerBtn.classList.add("collapsed");
      }
    }
  };
  
  return (
    <>
      {}
      <button
        className="navbar-toggler border-0 shadow-none px-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      
      {/* Dynamic Dropdown Area */}
      <div className="collapse navbar-collapse w-100" id="navbarTogglerDemo01">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-3 mt-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link py-2" to="/" onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link py-2" to="/about" onClick={closeMenu}>
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link py-2" to="/doctors" onClick={closeMenu}>
              Doctors
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link py-2" to="/gallery" onClick={closeMenu}>
              Gallery
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link py-2" to="/contact" onClick={closeMenu}>
              Contact
            </NavLink>
          </li>
        </ul>
        
        {/* Actions Layout Structure */}
        <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-2 pt-2 pb-3 pb-lg-0">
          <Link
            to={"/doctors"}
            className="btn btn-outline-success btn-sm px-3 py-2 fw-semibold text-center"
            onClick={closeMenu}
          >
            Book A Appointment
          </Link>
          
          {user ? (
            <NavLink 
              className="btn btn-light btn-sm text-dark border text-center py-2" 
              to="/user/profile"
              onClick={closeMenu}
            >
              <i className="fa-solid fa-user-circle me-1"></i> My Account
            </NavLink>
          ) : (
            <NavLink 
              className="btn btn-primary btn-sm text-white text-center py-2" 
              to="/login"
              onClick={closeMenu}
            >
              LOGIN
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default NavMenu;