import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchJobs} from "../../redux/slices/jobSlice.js";
import {useNavigate} from "react-router-dom";

function AdminJobs () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {jobList, loading, error} = useSelector((state) => state.jobs);

    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

  return (
    <div>
        <div className={'text-center my-4'}>
            <h1>Admin Jobs</h1>
            <p>This is the Admin Jobs page.</p>
        </div>
        <div className={'px-5 py-4'}>
            <div className="row">
                {jobList.length > 0 && jobList.map((job) => (
                    <div className={'col-3 mb-4'} key={job.id}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title" style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>{job.title}</h5>
                                <p className="card-text" style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 5,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>{job.body}</p>
                                <p className={'text-sm text-blue-400 font-bold cursor-pointer'} onClick={() => navigate(`/admin-job/${job.id}`)}>Explore more</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}

export default AdminJobs;
