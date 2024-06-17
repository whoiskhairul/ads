import { React, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ShowDetails = () => {
    const location = useLocation()
    const path = location.pathname
    const facility_name = path.split('/')[1]
    const url = 'http://' + 'localhost:8000/api' + path
    // console.log(url)

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(async response => {
                if (!response.ok) {
                    throw new Error('404 not found');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    //   console.log(data)
    let details = data.properties
    // console.log(id)

    return (
        <div className=' w-2/5 py-12 px-8'>
            <p className='text-center text-3xl font-bold text-red-600 py-8'>{facility_name.toUpperCase()}</p>
            {/* <table className='table-auto border border-slate-400'>
                <tbody className='table-auto border border-slate-400'>
                    {Object.entries(details).map(([key, value]) => (
                        <tr key={key}>
                            <td className='border border-slate-300 hover:bg-gray-100 text-center w-24 uppercase'> {key} </td>
                            <td className='border border-slate-300 hover:bg-gray-100 px-4 py-2 w-72'> {value} </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table> */}

            <table className="table-auto border border-slate-400 min-w-full divide-y classNamedivide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="border border-slate-300 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                            Key
                        </th>
                        <th scope="col" className="border border-slate-300 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Value
                        </th>
                    </tr>
                </thead>
                <tbody className="table-auto border border-slate-400 bg-white divide-y">
                {Object.entries(details).map(([key, value]) => (
                    <tr key={key} className='w-1/6'>
                        <td className="border border-slate-300 text-center hover:bg-gray-100 px-6 py-4 uppercase whitespace-nowrap w-1/4">{key}</td>
                        <td className="border border-slate-300 text-center hover:bg-gray-100 px-6 py-4 whitespace-nowrap w-1/4">{value}</td>
                    </tr>
                    ))
                }
                </tbody>
            </table>

        </div>
    );
};

export default ShowDetails
