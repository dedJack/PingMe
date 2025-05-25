import React from "react";
import { THEMES } from "../constants/index";
import { useThemeStore } from "../store/useThemeStore";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen p-8 bg-base-100 text-base-content">

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Theme</h1>
        <p className="text-lg text-gray-600 mt-2">
          You can change your theme for chat
        </p>
      </div>

      {/* Theme Selection Grid */}
      <div className="grid grid-cols-8 gap-4 mb-10">
        {THEMES.map((t) => (
          <button
          key={t}
          onClick={() => setTheme(t)}
          // data-theme={t}
          className={`p-0 h-auto  rounded-lg cursor-pointer border border-base-300  ${t===theme ?"":'hover:shadow-lg'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 bg-base-100 flex flex-col items-center justify-center text-base-content overflow-hidden `}
          >
                <div className="w-full px-2 pt-2 pb-1 sm:px-3 sm:pt-3 sm:pb-1.5" > {/* Adjusted padding */}
                  <div className="relative h-8 w-full rounded-md overflow-hidden " >
                    {/* Preview colors will use the 'data-theme' from the button */}
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-0.5" data-theme={t}> {/* Ensure gap-px and p-0.5 for tight fit */}
                      <div className="h-full rounded-sm bg-primary"></div>
                      <div className="h-full rounded-sm bg-secondary"></div>
                      <div className="h-full rounded-sm bg-accent"></div>
                      <div className="h-full rounded-sm bg-neutral"></div>
                    </div>
                  </div>
                </div>
                <span className="text-xs sm:text-sm capitalize  group-hover:text-primary">
                  {t}
                </span>
              </button>
        ))}
      </div>

      {/* Another Section Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Other Settings
        </h2>
        <p className="text-gray-600">
          Additional configuration options can go here.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
