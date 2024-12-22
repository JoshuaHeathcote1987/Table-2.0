import React from 'react'

export default function Logo() {
  return (
    <div className="relative w-44 h-44">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center rounded-lg"
        style={{
          backgroundImage: "url('https://img.freepik.com/free-vector/topographic-map-background-design_23-2148585566.jpg?t=st=1734856202~exp=1734859802~hmac=8f8d547b0591b6ccbb00d45a3fd05e02418c52f04a3ae8c7fa4a516504419d1c&w=1060')",
        }}
      ></div>

      {/* Content with Opacity */}
      <div className="relative rounded-lg bg-gray-300 bg-opacity-50 w-44 h-44 flex items-center justify-center">
        <div className="flex rounded-lg flex-row items-center justify-center bg-gray-600 bg-opacity-80 h-5/6 w-5/6">
          <div className="flex rounded-lg flex-row items-center justify-center bg-gray-300 bg-opacity-30 h-5/6 w-5/6 p-4">
            .tables
          </div>
        </div>
      </div>
    </div>
  )
}
