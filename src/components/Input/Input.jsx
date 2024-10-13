import { forwardRef } from "react";
import "./Input.css";
import cn from 'classnames';

const Input = forwardRef(function Input({ className, isValid = true, appearance, ...props }, ref) {
  return (
    <input
      ref={ref}  
      type="text"
      {...props}
      className={cn(className, 'styles', { 
        input: true, 
        invalid: !isValid, 
        'input-title': appearance === 'title' 
      })}
    />
  );
});

export default Input;
