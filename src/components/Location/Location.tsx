import * as React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { ResumeSchema } from '../../types/ResumeSchema'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useSpring, animated, config, interpolate } from 'react-spring'

type LocationProps = {
  resume: ResumeSchema
}

function Location({ resume }: LocationProps) {
  return (
    <span>
      {resume.basics?.location?.city}, {resume.basics?.location?.countryCode}{' '}
      <FaMapMarkerAlt className="inline align-bottom" />
    </span>
  )
}

export default Location
