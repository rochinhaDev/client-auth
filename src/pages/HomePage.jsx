import { useEffect, useState } from "react";
import axios  from "axios";
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
      <h1>Home Page</h1>
      <p></p>
      <p></p>
      {}
    </main>
  );
}
