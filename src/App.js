import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//  import Navbar from "./Components/Navbar";
import Layouts from "./Components/Layouts";
import Listofbooking from "./Components/Listofbooking";
import './Components/index.css';

import Login from "./Components/Login";

export default function App() {

	return (
		<BrowserRouter>
		<Routes>
<Route path="/" element={<Layouts />}/> 

<Route index element={<Login/>}/>
<Route path= "/listofbooking" element={<Listofbooking/>}/> 

		</Routes>
		</BrowserRouter>
		
	
		
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);