import * as React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { ResumeSchema } from '../../types/ResumeSchema'
import { FaGithub } from 'react-icons/fa'
import { useSpring, animated, config, interpolate } from 'react-spring'

type GithubProps = {
  resume: ResumeSchema
}

function Github({ resume }: GithubProps) {
  const githubDetails = resume.basics?.profiles?.find(
    profile => profile.network === 'Github'
  )

  return (
    <a href={githubDetails.url}>
      {githubDetails.username} <FaGithub className="inline align-bottom" />
    </a>
  )
}

export default Github
