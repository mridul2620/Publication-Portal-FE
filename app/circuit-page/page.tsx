import CircuitPageContent from "@/src/components/circuitpage/circuitPage";
import React from "react";
import { Suspense } from 'react';


const CircuitPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CircuitPageContent />
    </Suspense>
  );
};

export default CircuitPage;