"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';

const BackButton = () => {
  const router = useRouter();

  return (
    <Button 
      onClick={() => router.back()} 
      className='mt-2 mb-2'
    >
      Back
    </Button>
  );
}

export default BackButton;