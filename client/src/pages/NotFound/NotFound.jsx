import { Link, useNavigate } from "react-router-dom"; 
 
function NotFound() { 
  const navigate = useNavigate(); 
 
  return ( 
    <section className="not-found"> 
 
      <div className="error-number"> 
        404 
      </div> 
 
      <h1>Page Not Found</h1> 
 
      <p> 
        The page you are looking for does not exist. 
      </p> 
 
      <div className="not-found-buttons"> 
 
        {/* Go to Home */} 
        <Link to="/" className="btn primary"> 
          Go Home 
        </Link> 
 
        {/* Go to Previous Page */} 
        <button 
          className="btn secondary" 
          onClick={() => navigate(-1)} 
        > 
          ← Go Back 
        </button> 
 
      </div> 
 
    </section> 
  ); 
} 
 
export default NotFound; 