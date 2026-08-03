import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "/logo3.jpeg";

import {
  getLatestReport,
  getProjectReports,
} from "../services/siteReportService";
import {
  MapPin,
  Wallet,
  Building2,
  ChartNoAxesColumn,
} from "lucide-react";
import { getProject } from "../services/projectService";

export default function PublicProject() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latestReport, setLatestReport] = useState(null);
const [reports, setReports] = useState([]);

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    try {
      const data = await getProject(id);
      setProject(data.project);
      const latest = await getLatestReport(id);

if (latest.success) {
  setLatestReport(latest.report);
}

const history = await getProjectReports(id);

if (history.success) {
  setReports(history.reports);
}
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <h2 className="text-2xl font-semibold">Loading Project...</h2>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <h2 className="text-2xl font-semibold">Project Not Found</h2>
      </div>
    );
  }


  const milestones = project.milestones || [];

const completedMilestones = milestones.filter(
  (m) => m.completed
).length;

const progress =
  milestones.length > 0
    ? Math.round(
        (completedMilestones / milestones.length) * 100
      )
    : 0;

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-amber-700 text-white">

{/* Background Glow */}
<div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl"></div>
<div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

<div className="relative mx-auto max-w-7xl px-8 py-16">

  {/* Header */}

  <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

    <div className="flex items-center gap-6">

      <img
        src={logo}
        alt="BuildPilot AI"
        className="h-24 w-24 rounded-3xl border-4 border-white object-cover shadow-2xl"
      />

      <div>

        <p className="uppercase tracking-[6px] text-amber-300 text-sm font-semibold">
          3ACES
        </p>

        <h1 className="mt-2 text-5xl font-extrabold">
          {project.name}
        </h1>

        <p className="mt-4 text-lg text-slate-200">
          Client: <span className="font-semibold">{project.client}</span>
        </p>

        <p className="mt-2 text-slate-300">
          Live construction progress shared securely.
        </p>

      </div>

    </div>

    {/* Status Card */}

    <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl shadow-2xl">

      <p className="text-slate-300 uppercase text-sm tracking-widest">
        Current Status
      </p>

      <h2 className="mt-3 text-4xl font-bold text-amber-300">
        {project.status}
      </h2>

      <div className="mt-6">

        <p className="mb-2 text-sm text-slate-300">
          Overall Progress
        </p>

        <div className="h-4 overflow-hidden rounded-full bg-white/20">

          <div
            className="h-full rounded-full bg-amber-400 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />

        </div>

        <p className="mt-3 text-right text-xl font-bold">
          {progress}%
        </p>

      </div>

    </div>

  </div>

</div>

</div>

<div className="mx-auto max-w-7xl px-8 py-14">

{/* Stats */}

<div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

  <Card
    icon={<Building2 size={36} />}
    title="Project Status"
    value={project.status}
  />

  <Card
    icon={<ChartNoAxesColumn size={36} />}
    title="Completion"
    value={`${progress}%`}
  />

  <Card
    icon={<Wallet size={36} />}
    title="Project Budget"
    value={`Rs. ${Number(project.budget).toLocaleString()}`}
  />

  <Card
    icon={<MapPin size={36} />}
    title="Location"
    value={project.location || "Not Specified"}
  />

</div>

{/* Project Overview */}

<div className="mt-12 rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">

  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

    <div>

      <h2 className="text-4xl font-bold text-slate-800">
        Project Overview
      </h2>

      <p className="mt-2 text-slate-500">
        Live information shared by your construction company.
      </p>

    </div>

    <div className="rounded-2xl bg-amber-100 px-6 py-4">

      <p className="text-sm font-medium text-amber-700">
        Overall Completion
      </p>

      <h3 className="text-3xl font-bold text-amber-700">
        {progress}%
      </h3>

    </div>

  </div>

  <p className="mt-8 text-lg leading-9 text-slate-600">
    {project.description ||
      "No project description has been added yet."}
  </p>

</div>


{/* Construction Milestones */}

<div className="mt-12 rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">

  <div className="mb-8">

    <h2 className="text-4xl font-bold">
      🏗 Construction Progress Timeline
    </h2>

    <p className="mt-2 text-slate-500">
      Track completed and upcoming construction stages.
    </p>

  </div>



  {
  !project.milestones || project.milestones.length === 0 ?

  (

    <div className="
    rounded-3xl
    border-2
    border-dashed
    border-slate-300
    p-12
    text-center
    ">

      <h3 className="text-xl font-semibold">
        No milestones available
      </h3>

      <p className="mt-2 text-slate-500">
        Construction stages will appear here as they are updated.
      </p>

    </div>

  )

  :

  (

  <div className="space-y-6">


  {
  project.milestones.map((item,index)=>(

  <div
  key={item._id}
  className="
  flex
  gap-5
  rounded-2xl
  border
  bg-slate-50
  p-6
  "
  >


    {/* Number */}

    <div
    className={`
    flex
    h-12
    w-12
    shrink-0
    items-center
    justify-center
    rounded-full
    font-bold
    text-white

    ${
      item.completed
      ?
      "bg-green-600"
      :
      "bg-amber-500"
    }

    `}
    >

    {index+1}

    </div>



    <div className="flex-1">


      <h3 className="text-xl font-bold">
        {item.name}
      </h3>



      <div className="mt-3 flex flex-wrap items-center gap-3">


        <span
        className={`
        rounded-full
        px-4
        py-2
        text-sm
        font-semibold

        ${
        item.completed
        ?
        "bg-green-100 text-green-700"
        :
        "bg-orange-100 text-orange-700"
        }

        `}
        >

        {
        item.completed
        ?
        "✓ Completed"
        :
        "⏳ In Progress"
        }

        </span>



        {
        item.completedAt &&

        <span className="text-sm text-slate-500">

        Completed on:
        {" "}
        {
        new Date(
        item.completedAt
        ).toLocaleDateString()
        }

        </span>

        }


      </div>


    </div>


  </div>


  ))
  }


  </div>

  )

  }


</div>

{/* Site Reports */}

<div className="mt-12 rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">

  <div className="mb-8">

    <h2 className="text-4xl font-bold">
      📚 Construction Updates
    </h2>

    <p className="mt-2 text-slate-500">
      Daily progress reports directly from the construction site.
    </p>

  </div>

  {reports.length === 0 ? (

    <div className="rounded-3xl border-2 border-dashed border-slate-300 p-16 text-center">

      <h3 className="text-2xl font-semibold">
        No Site Reports Yet
      </h3>

      <p className="mt-3 text-slate-500">
        Reports will appear here as construction progresses.
      </p>

    </div>

  ) : (

    <div className="space-y-8">

      {reports.map((report) => (

        <div
          key={report._id}
          className="rounded-3xl border border-slate-200 p-8 transition duration-300 hover:shadow-xl"
        >

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div>

              <h3 className="text-2xl font-bold">

                {new Date(report.createdAt).toLocaleDateString()}

              </h3>

              <p className="text-slate-500">
                Daily Site Report
              </p>

            </div>

            <div className="rounded-full bg-amber-100 px-5 py-2 font-semibold text-amber-700">

              👷 {report.workersPresent} Workers

            </div>

          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">

            <div className="rounded-2xl bg-slate-100 p-5">

              <h4 className="font-bold text-slate-700">
                🧱 Material Used
              </h4>

              <p className="mt-2 text-slate-600">
                {report.concreteUsed}
              </p>

            </div>

            <div className="rounded-2xl bg-slate-100 p-5">

              <h4 className="font-bold text-slate-700">
                🌤 Weather
              </h4>

              <p className="mt-2 text-slate-600">
                {report.weather}
              </p>

            </div>

            <div className="rounded-2xl bg-slate-100 p-5">

              <h4 className="font-bold text-slate-700">
                ⚠ Site Issues
              </h4>

              <p className="mt-2 text-slate-600">
                {report.issues || "No Issues Reported"}
              </p>

            </div>

          </div>

          <div className="mt-8">

            <h4 className="mb-3 text-lg font-bold">
              Completed Work
            </h4>

            <div className="flex flex-wrap gap-3">

              {report.completedWork?.map((work, index) => (

                <span
                  key={index}
                  className="rounded-full bg-green-100 px-4 py-2 font-medium text-green-700"
                >
                  ✔ {work}
                </span>

              ))}

            </div>

          </div>

        </div>

      ))}

    </div>

  )}

</div>

{/* Gallery */}

<div className="mt-12 rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">

  <div className="mb-8">

    <h2 className="text-4xl font-bold">
      📷 Project Gallery
    </h2>

    <p className="mt-2 text-slate-500">
      Recent photographs uploaded directly from the construction site.
    </p>

  </div>

  <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

    {project.photos?.length ? (

      project.photos.map((photo, index) => (

        <div
          key={index}
          className="group overflow-hidden rounded-3xl shadow-xl transition duration-300 hover:-translate-y-2"
        >

          <img
            src={photo}
            alt={`Project ${index + 1}`}
            className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
          />

        </div>

      ))

    ) : (

      <div className="col-span-full rounded-3xl border-2 border-dashed border-slate-300 p-16 text-center">

        <h3 className="text-2xl font-semibold">
          No Project Photos Yet
        </h3>

        <p className="mt-3 text-slate-500">
          Site images will appear here once uploaded by the builder.
        </p>

      </div>

    )}

  </div>

</div>

{/* Footer */}

<div className="mt-16 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-amber-700 p-10 text-center text-white shadow-2xl">

  <h2 className="text-3xl font-bold">
    BuildPilot AI
  </h2>

  <p className="mt-4 text-slate-200">
    This project dashboard is updated directly by your construction company
    to keep you informed with the latest progress, reports, and site photos.
  </p>

  <p className="mt-6 text-amber-300 font-semibold">
    Secure • Real-Time • Transparent
  </p>

</div>

</div>

    </div>
  );
}

function Card({ icon, title, value }) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow transition hover:-translate-y-1 hover:shadow-xl">

      <div className="mb-5 text-blue-600">
        {icon}
      </div>

      <p className="text-slate-500">
        {title}
      </p>

      <h2 className="mt-3 text-2xl font-bold">
        {value}
      </h2>

    </div>
  );
}