import React from 'react';
import { useSelector } from '../../hooks/hooks';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { useParams } from 'react-router-dom';

export const IngredientPage = () => {
    const { ingredients } = useSelector((store: any) => store.ingredients);
    let { ingredientId } = useParams();
    return (
        <div>
            <IngredientDetails dataId={ingredientId} data={ingredients} />
        </div>
    );
}

export default IngredientPage;