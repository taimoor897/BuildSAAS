import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getProject } from "../services/projectService";
import CreateDeliveryModal from "../Delivery/CreateDeliveryModal";
import DailyReportModal from "../Reports/DailyReportModal";




export default function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [photos, setPhotos] = useState(project?.photos || []);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [milestones, setMilestones] = useState([]);
const [milestoneName, setMilestoneName] = useState("");


  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    try {
      const data = await getProject(id);
      setProject(data.project);
setPhotos(data.project.photos || []);
setMilestones(data.project.milestones || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <h2 className="text-2xl font-semibold">Loading project...</h2>
      </DashboardLayout>
    );
  }

  if (!project) {
    return (
      <DashboardLayout>
        <h2 className="text-2xl font-semibold">Project not found.</h2>
      </DashboardLayout>
    );
  }


  const handleUpload = async () => {

  if (!selectedImage) {
    alert("Please select an image");
    return;
  }


  try {

    setUploading(true);


    const formData = new FormData();

    formData.append(
      "image",
      selectedImage
    );


    const response = await fetch(
      "http://localhost:5000/api/upload/project-image",
      {
        method:"POST",
        body:formData,
      }
    );


    const data = await response.json();


   await fetch(
  `http://localhost:5000/api/projects/${id}/photos`,
  {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify({
      url:data.url
    })
  }
);


setPhotos([
  ...photos,
  data.url
]);


    setSelectedImage(null);


    alert("Image uploaded");


  } catch(err){

    console.error(err);
    alert("Upload failed");

  } finally {

    setUploading(false);

  }

};


const handleDeletePhoto = async (photoUrl) => {
  const confirmDelete = window.confirm(
    "Delete this photo?"
  );

  if (!confirmDelete) return;

  try {
    await fetch(
      `http://localhost:5000/api/projects/${id}/photos`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: photoUrl,
        }),
      }
    );


    setPhotos(
      photos.filter((photo) => photo !== photoUrl)
    );


    alert("Photo deleted");

  } catch(err) {

    console.error(err);
    alert("Failed to delete photo");

  }
};


const addMilestone = async () => {

  if (!milestoneName.trim()) {
    alert("Enter milestone name");
    return;
  }


  try {

    const response = await fetch(
      `http://localhost:5000/api/projects/${id}/milestones`,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization:
          `Bearer ${localStorage.getItem("token")}`,
        },
        body:JSON.stringify({
          name:milestoneName
        })
      }
    );


    const data = await response.json();


    setMilestones(data.milestones);

    setMilestoneName("");


  } catch(error){

    console.log(error);

  }

};



const completeMilestone = async (milestoneId)=>{

  try{

    const response = await fetch(
      `http://localhost:5000/api/projects/${id}/milestones/${milestoneId}/complete`,
      {
        method:"PUT",
        headers:{
          Authorization:
          `Bearer ${localStorage.getItem("token")}`,
        }
      }
    );


    const data = await response.json();


    setMilestones(data.milestones);


  }catch(error){

    console.log(error);

  }

};


const handleDeleteMilestone = async (milestoneId)=>{

  const confirmDelete = window.confirm(
    "Delete this milestone?"
  );

  if(!confirmDelete) return;


  try{

    const response = await fetch(
      `http://localhost:5000/api/projects/${id}/milestones/${milestoneId}`,
      {
        method:"DELETE",
        headers:{
          Authorization:
          `Bearer ${localStorage.getItem("token")}`
        }
      }
    );


    const data = await response.json();


    setMilestones(data.milestones);


  }catch(error){

    console.error(error);

  }

};



const openWhatsApp = () => {

  if (!project.clientPhone) {
    alert("Client phone number not available");
    return;
  }


  const phone = project.clientPhone
    .replace(/\D/g, "");


  const message = encodeURIComponent(
    `Hello ${project.client}, this is an update regarding your project ${project.name}.`
  );


  window.open(
    `https://wa.me/${phone}?text=${message}`,
    "_blank"
  );

};


const completedMilestones = milestones.filter(
  (m) => m.completed
).length;

const progress =
  milestones.length > 0
    ? Math.round((completedMilestones / milestones.length) * 100)
    : 0;

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}

        <div className="rounded-3xl bg-white p-8 shadow">

          <div className="flex flex-col justify-between gap-6 lg:flex-row">

            <div>
              <h1 className="text-4xl font-bold">
                {project.name}
              </h1>

              <p className="mt-2 text-lg text-slate-500">
                {project.client}
              </p>
            </div>

            <div className="w-full max-w-sm">

              <div className="mb-2 flex justify-between">

                <span className="font-medium">
                  Progress
                </span>

                <span className="font-bold">
                  {progress}%
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>

          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-4">

            <InfoCard
              title="Status"
              value={project.status}
            />

            <InfoCard
              title="Budget"
              value={`Rs. ${Number(project.budget).toLocaleString()}`}
            />

            <InfoCard
              title="Location"
              value={project.location || "Not specified"}
            />

            <InfoCard
              title="Client"
              value={project.client}
            />

          </div>

        </div>

        {/* Tabs */}

        <div className="flex flex-wrap gap-3">

          {[
            "overview",
            "photos",
            "milestones",
            
            
            
            "share",
          ].map((tab) => (

            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-5 py-3 capitalize transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white shadow hover:bg-slate-100"
              }`}
            >
              {tab}
            </button>

          ))}

        </div>
  

        {/* OVERVIEW */}

        {activeTab === "overview" && (

          <div className="grid gap-6 lg:grid-cols-2">

            <div className="rounded-3xl bg-white p-6 shadow">

              <h2 className="mb-4 text-2xl font-bold">
                Project Description
              </h2>

              <p className="leading-8 text-slate-600">
                {project.description ||
                  "No description has been added yet."}
              </p>

            </div>

            <div className="rounded-3xl bg-white p-6 shadow">

              <h2 className="mb-4 text-2xl font-bold">
                Project Information
              </h2>

       

              <div className="space-y-4">

                <InfoRow
                  label="Client"
                  value={project.client}
                />

                <InfoRow
                  label="Location"
                  value={project.location}
                />

                <InfoRow
                  label="Status"
                  value={project.status}
                />

                <InfoRow
                  label="Budget"
                  value={`Rs. ${Number(project.budget).toLocaleString()}`}
                />

                <InfoRow
                  label="Progress"
                  value={`${progress}%`}
                />

              </div>

            </div>

          </div>

        )}

        {/* PHOTOS */}

        {activeTab === "photos" && (

          <div className="rounded-3xl bg-white p-10 shadow">

            <h2 className="text-3xl font-bold">
              📷 Site Gallery
            </h2>

            <p className="mt-2 text-slate-500">
              Upload site photos to track project progress.
            </p>

            <div className="mt-8">

<input
  type="file"
  accept="image/*"
  className="block w-full rounded-xl border border-slate-300 p-3"
  onChange={(e) => {
    console.log(e.target.files[0]);
    setSelectedImage(e.target.files[0]);
  }}
/>
{
  selectedImage && (
    <p className="mt-2 text-green-600">
      Selected: {selectedImage.name}
    </p>
  )
}


<button
onClick={handleUpload}
disabled={uploading}
className="mt-4 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
>

{
uploading
?
"Uploading..."
:
"Upload Photo"
}

</button>

</div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">

              {
photos.length === 0 ? (

<div className="flex h-48 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300">

No Photos Yet

</div>

) : (

  photos.map((photo,index)=>(

    <div
      key={index}
      className="relative overflow-hidden rounded-2xl"
    >
    
    <img
      src={photo}
      className="h-48 w-full object-cover"
    />
    
    
    <button
      onClick={() => handleDeletePhoto(photo)}
      className="
        absolute
        right-3
        top-3
        rounded-full
        bg-red-600
        px-3
        py-1
        text-sm
        font-bold
        text-white
        hover:bg-red-700
      "
    >
      Delete
    </button>
    
    
    </div>
    
    ))

)
}

            </div>

          </div>

        )}

        {/* TIMELINE */}

        {activeTab === "timeline" && (

          <div className="rounded-3xl bg-white p-8 shadow">

            <div className="flex items-center justify-between">

              <h2 className="text-3xl font-bold">
                Construction Timeline
              </h2>

              <button className="rounded-xl bg-blue-600 px-5 py-3 text-white">
                + Add Update
              </button>

            </div>

            <div className="mt-8 rounded-2xl border border-dashed p-10 text-center text-slate-500">

              No updates have been added yet.

            </div>

          </div>

        )}

        {/* DOCUMENTS */}

        {activeTab === "documents" && (

          <div className="rounded-3xl bg-white p-8 shadow">

            <div className="flex items-center justify-between">

              <h2 className="text-3xl font-bold">
                Project Documents
              </h2>

              <button className="rounded-xl bg-blue-600 px-5 py-3 text-white">
                Upload Document
              </button>

            </div>

            <div className="mt-8 rounded-2xl border border-dashed p-10 text-center text-slate-500">

              No documents uploaded.

            </div>

          </div>

        )}

        {/* MILESTONES */}

        {activeTab === "milestones" && (

<div className="rounded-3xl bg-white p-10 shadow">

<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

<div>
<h2 className="text-3xl font-bold">
🏗 Construction Milestones
</h2>

<p className="mt-2 text-slate-500">
Track every stage of the project.
</p>
</div>


<div className="rounded-2xl bg-blue-50 px-6 py-4">

<p className="text-sm text-slate-500">
Progress
</p>

<h3 className="text-2xl font-bold">

{
milestones.length === 0
?
0
:
Math.round(
(milestones.filter(m=>m.completed).length /
milestones.length) * 100
)
}%

</h3>

</div>


</div>



<div className="mt-8 flex gap-3">

<input
value={milestoneName}
onChange={(e)=>setMilestoneName(e.target.value)}
placeholder="Add milestone (Foundation, Structure, Painting...)"
className="flex-1 rounded-xl border p-3"
/>


<button
onClick={addMilestone}
className="rounded-xl bg-blue-600 px-8 text-white"
>
+ Add
</button>


</div>




<div className="mt-10 space-y-5">


{
milestones.length === 0 ?

<div className="rounded-2xl border border-dashed p-10 text-center text-slate-500">

No milestones created yet.

</div>


:


milestones.map((item,index)=>(

<div
key={item._id}
className="flex flex-col gap-5 rounded-2xl border p-6 shadow-sm transition hover:shadow-md md:flex-row md:items-center md:justify-between"
>


<div className="flex items-center gap-5">


<div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">

{String(index+1).padStart(2,"0")}

</div>



<div>

<h3 className="text-xl font-bold">
{item.name}
</h3>


<div className="mt-2 flex items-center gap-3">


<span
className={`rounded-full px-3 py-1 text-sm font-semibold ${
item.completed
?
"bg-green-100 text-green-700"
:
"bg-orange-100 text-orange-700"
}`}
>

{
item.completed
?
"✓ Completed"
:
"⏳ Pending"
}

</span>


{
item.completed && item.completedAt &&

<span className="text-sm text-slate-500">

{
new Date(item.completedAt)
.toLocaleDateString()
}

</span>

}


</div>


</div>

</div>





<div className="flex flex-wrap gap-3">


{
!item.completed &&

<button
onClick={()=>completeMilestone(item._id)}
className="rounded-xl bg-green-600 px-5 py-2 text-white"
>
Complete
</button>

}


<button
onClick={()=>handleDeleteMilestone(item._id)}
className="rounded-xl bg-red-600 px-5 py-2 text-white"
>
Delete
</button>


</div>



</div>


))

}


</div>


</div>

)}








        {/* SHARE */}

        {activeTab === "share" && (

          <div className="rounded-3xl bg-white p-8 shadow">

            <h2 className="text-3xl font-bold">
              Share Project
            </h2>

            <p className="mt-2 text-slate-500">
              Share this project with your client using a secure link.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

             <div className="mt-8 flex flex-wrap gap-4">

  <button
  onClick={() => {
    const shareLink = `${window.location.origin}/share/${project._id}`;

    navigator.clipboard.writeText(shareLink);

    alert("Share link copied!");
  }}
  className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
>
  Copy Share Link
</button>

<button
  onClick={openWhatsApp}
  className="
    flex
    items-center
    gap-2
    rounded-xl
    bg-green-600
    px-6
    py-3
    text-white
    hover:bg-green-700
  "
>
  💬 WhatsApp Client
</button>

<button
  onClick={() => setShowReportModal(true)}
  className="rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"
>
  📝 Daily Site Report
</button>

{showReportModal && (
  <DailyReportModal
    project={project}
    onClose={() => setShowReportModal(false)}
    onSaved={() => {
      // Optional: refresh project data or reports
    }}
  />
)}


  <button
    onClick={() => {
      const subject = encodeURIComponent(
        `Project Update: ${project.name}`
      );

      const body = encodeURIComponent(
        `Hello,\n\nHere is the project update for ${project.name}.\n\nProject Link:\n${window.location.href}`
      );

      window.location.href =
        `mailto:?subject=${subject}&body=${body}`;
    }}
    className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
  >
    Share via Email
  </button>




</div>

            </div>

          </div>

        )}

        {showDeliveryModal && (
  <CreateDeliveryModal
    project={project}
    onClose={() => setShowDeliveryModal(false)}
  />
)}

      </div>


    </DashboardLayout>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-slate-100 p-5">
      <p className="text-slate-500">{title}</p>

      <h2 className="mt-2 text-xl font-bold">
        {value}
      </h2>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-3">
      <span className="font-medium text-slate-500">
        {label}
      </span>

      <span className="font-semibold">
        {value || "-"}
      </span>
    </div>
  );
}