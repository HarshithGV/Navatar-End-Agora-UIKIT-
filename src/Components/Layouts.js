import {Outlet, Link} from "react-router-dom";
const Layout = () => {
    return (
        <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <Link class="navbar-brand" id="nav-title" to="/">NAVATAR</Link>
   
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link class="nav-link active" id="nav" aria-current="page" to="/">Home</Link>
        </li>
       
      </ul>
    </div>
  </div>
</nav>
        <Outlet />
        </>
    )
}
export default Layout;