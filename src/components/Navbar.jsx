import {Link} from "react-router-dom";
import {LayoutDashboard, Utensils, Heart, PlusCircle} from 'lucide-react';
    
function Navbar() {
    <nav style={{ width: '20px', background: '#0F172A', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '25px' }}>
        <h2 style={{ fontSize: '1.2rem', display: 'flex', alignitems: 'center', gap: '5px', marginBottom: '25px' }}><Utensils size={24} color="#0D9488" />Recipe Manager</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to="/" style={linkStyle}><LayoutDashboard size={20} />Dashboard</Link>
            <Link to="/" style={linkStyle}><Utensils size={20} />All Recipes</Link>
            <Link to="/favorite" style={linkStyle}><Heart size={20} />Favorites</Link>
            <div style={{ marginTop: '30px', background: '#1E293B', padding: '12px', borderRadius: '8px' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'cnter' }}><PlusCircle size={20} />Add New
                </Link>
            </div>
        </div>
    </nav>;
}

const linkStyle = {color: 'white', textDecoration: '#94A3B8', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', borderRadius: '5px'};

export default Navbar;