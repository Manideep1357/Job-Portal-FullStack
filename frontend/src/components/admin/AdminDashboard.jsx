import React from 'react'
import Navbar from '../shared/Navbar'
import { useSelector } from 'react-redux'

const AdminDashboard = () => {
    const { allAdminJobs } = useSelector(store => store.job);
    
    // Total Applications count sum cheyadaniki logic
    const totalApplications = allAdminJobs?.reduce((acc, job) => acc + job.applications.length, 0);
    const activeJobs = allAdminJobs?.filter(job => job.applications.length > 0).length;

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-2xl mb-5'>Recruitment Analytics</h1>
                
                {/* Analytics Cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    <div className='p-6 bg-blue-100 border-l-4 border-blue-500 rounded-lg shadow-md'>
                        <h2 className='text-blue-700 font-semibold uppercase text-sm'>Total Jobs Posted</h2>
                        <p className='text-4xl font-bold mt-2'>{allAdminJobs?.length || 0}</p>
                    </div>

                    <div className='p-6 bg-green-100 border-l-4 border-green-500 rounded-lg shadow-md'>
                        <h2 className='text-green-700 font-semibold uppercase text-sm'>Total Applications</h2>
                        <p className='text-4xl font-bold mt-2'>{totalApplications || 0}</p>
                    </div>

                    <div className='p-6 bg-purple-100 border-l-4 border-purple-500 rounded-lg shadow-md'>
                        <h2 className='text-purple-700 font-semibold uppercase text-sm'>Active Roles</h2>
                        <p className='text-4xl font-bold mt-2'>{activeJobs || 0}</p>
                    </div>
                </div>

                {/* Ikkada meeru patha Jobs table ni kuda import chesi pettukochu */}
            </div>
        </div>
    )
}

export default AdminDashboard