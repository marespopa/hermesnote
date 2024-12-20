import { atom_showDashboard } from '@/app/atoms/atoms';
import Checkbox from '@/app/components/Checkbox';
import { useAtom } from 'jotai';
import React from 'react'

function ShowWelcomeCheckbox() {
  const [showDashboardOnStartup, setShowDashboardOnStartup] = useAtom(atom_showDashboard);

  return (
    <div className="mt-16 mb-8 flex justify-center">
        <Checkbox
          label="Show welcome page on startup"
          name="replaceAll"
          checked={showDashboardOnStartup}
          handleChange={(e: React.FormEvent<HTMLInputElement>) => {
            setShowDashboardOnStartup(e.currentTarget.checked);
          }}
        />
  </div>
  )
}

export default ShowWelcomeCheckbox