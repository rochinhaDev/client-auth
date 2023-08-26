import { useEffect, useState } from "react";
import axios from "axios";
export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    async function getJobs() {
      const response = await axios.get(
        "http://localhost:4000/job/all/open/public"
      );
      setJobs(response.data);
    }

    getJobs();
  }, []);
  console.log(jobs);
  return (
    <main>
      <div className="relative">
        <img
          className="h-32 w-full object-cover rounded-md opacity-90"
          src="https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-70 rounded-md">
          <p className="text-white text-3xl font-mono text-center">
            Encontre aqui sua vaga de Desenvolvedor
          </p>
        </div>
      </div>

      <div>{/* AQUI VAI O SEARCH BAR E O FILTRO */}</div>

      {/* aqui vai mostrar os cards */}
      <div>
        {jobs.map((job) => {
          return (
            <div key={job._id}>
              <h2>{job.title}</h2>
            </div>
          );
        })}
      </div>
    </main>
  );
}
