import {Search} from 'lucide-react';
import Recipeform from './Recipeform';
import RecipeCard from './RecipeCard';

const Dashboard = ({recipes, onAddRecipe, onFavorite, loading}) => {
    <div style= {{ display: 'grid',gridTemplateColumns: '400px 1fr', height: '100%' }}>
        <aside style= {{padding: '30px', borderRight: '1px solid #E2E8F0',background: 'white', overflowY: 'auto' }}>
            <Recipeform onAddRecipe={onAddRecipe} />
        </aside>
        <section style= {{ padding: '30px',overflowY: 'auto' }}>
            <div style= {{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h1 style= {{margin: 0}}>My Recipes</h1>
                <div style ={{ position: 'relative' }}>
                    <Search size = {18} color="#94A3B8" />
                    <input placeholder="Search recipes....." style={{padding: '10px 10px 10px 40px', borderRadius: '8px', border: '1px solid #CBD5E1', width:'350px'}}/>
                </div>

                <div style ={{display: 'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px, fr))', gap: '25px'}}>
                    {recipes.map(recipe=>
                        <RecipeCard key= {recipe.id} recipe={recipe} onDelete={()=>{}} onToggleFavorite={onFavorite} />
                    )}
                </div>
            </div>
        </section>
    </div>
};

export default Dashboard;