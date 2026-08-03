import { Building2 } from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">

      {/* Branding Section */}
      <div
        className="
          flex
          flex-col
          justify-center
          bg-gradient-to-br
          from-blue-700
          to-sky-500
          px-6
          py-8
          text-white
          lg:px-16
          lg:py-0
        "
      >

        <div className="flex items-center justify-center gap-3 mb-5 lg:justify-start lg:mb-8">

          <Building2 size={36} />

          <h1 className="text-3xl font-bold lg:text-4xl">
            BuildPilot AI
          </h1>

        </div>


        <h2 className="text-center text-3xl font-bold leading-tight lg:text-left lg:text-5xl">

          AI Powered
          <br />
          Construction
          <br />
          Management

        </h2>


        <p className="mt-4 text-center text-blue-100 leading-7 lg:text-left lg:text-lg lg:leading-8">

          Manage projects, materials, budgets and reports
          from one intelligent platform.

        </p>


        <div className="mt-6 hidden space-y-3 text-center lg:mt-12 lg:block lg:text-left">

          <div>✔ AI Daily Reports</div>

          <div>✔ Inventory Tracking</div>

          <div>✔ Budget Analytics</div>

          <div>✔ Smart Project Monitoring</div>

        </div>


      </div>


      {/* Form Section */}
      <div
        className="
          flex
          items-center
          justify-center
          p-4
          sm:p-6
        "
      >

        {children}

      </div>


    </div>
  );
}