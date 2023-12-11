// import React, { useState } from 'react';

// const App = () => {
//   const [data, setData] = useState([]);
//   const [input, setInput] = useState('');

//   const fetchData = () => {
//     fetch('https://jsonplaceholder.typicode.com/posts')
//       .then((res) => res.json())
//       .then((resdata) => {
//         console.log(resdata);
//         setData(resdata);
//       });
//   };

//   const AllData = data.filter((ele) =>

//     ele.title.toLowerCase().includes(input.toLowerCase()) ||
//     ele.body.toLowerCase().includes(input.toLowerCase())
//   );

//   const handleButtonClick = () => {
//     fetchData();
//   };


//   return (
//     <div>
//       <input type="text" onChange={ (e) => setInput(e.target.value) } />
//       <button onClick={ handleButtonClick }>show data</button>
//       <table>
//         <thead>
//           <tr>
//             <th>id</th>
//             <th>userId</th>
//             <th>title</th>
//             <th>body</th>
//           </tr>
//         </thead>
//         <tbody>
//           { AllData.map((ele, index) => (
//             <tr key={ index }>
//               <td>{ ele.id }</td>
//               <td>{ ele.userId }</td>
//               <td>{ ele.title }</td>
//               <td>{ ele.body }</td>
//             </tr>
//           )) }
//         </tbody>
//       </table>
//     </div>
//   );
// };
// export default App;

import React, { useEffect, useState } from 'react';
import './App.css'
const App = () => {
    const [data, setData] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);

    const fetchData = async () => {
        await fetch('https://jsonplaceholder.typicode.com/posts')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const previous = () => {
        if (start >= 10) {
            setStart(start - 10);
            setEnd(end - 10);
        }

    };

    const next = () => {
        if (end < data.length) {
            setStart(start + 10);
            setEnd(end + 10);
        }

    };

    const buttonclick = (index) => {
        setStart(index * 10);
        setEnd((index + 1) * 10);
    }

    const generateButtons = () => {
        const totalbutton = Math.ceil(data.length / 10);
        return Array.from({ length: totalbutton }, (_, index) => (
            <button key={ index } onClick={ () => buttonclick(index) } disabled={ start === index * 10 }>
                { index + 1 }
            </button>
        ));
    };

    return (
        <>
            <table style={ { height: "60vh" } }>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>userId</th>
                        <th>title</th>
                        <th>body</th>
                    </tr>
                </thead>
                <tbody>
                    { data.slice(start, end).map((ele, index) => (
                        <tr key={ index }>
                            <td>{ ele.id }</td>
                            <td>{ ele.userId }</td>
                            <td>{ ele.title }</td>
                            <td>{ ele.body }</td>
                        </tr>
                    )) }
                </tbody>
            </table>
            <div>
                <button onClick={ previous }>Previous</button>
                { generateButtons() }
                <button onClick={ next }>Next</button>
            </div>
        </>

    );
};

export default App;
