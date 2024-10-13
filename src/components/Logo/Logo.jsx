
import './Logo.css';
import { memo } from 'react';
function Logo({ image }) {
    return <img className="logos" src={image} alt="Логотип журнала" />
}



export default memo(Logo); // если есть функция то memo работать не будет по скольку функции это обекты а если сравнивать обекты то будет false, memo работает только для примитнтивных типов

