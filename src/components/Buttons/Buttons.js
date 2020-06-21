import React from "react";
import { FaEdit } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import './Buttons.css';

export const EditBtn = () => {
    return <button className="Button"><FaEdit /></button>
}

export const ViewBtn = () => {
    return <button className="Button"><FaEye /></button>
}