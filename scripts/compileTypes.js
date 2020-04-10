var schemaConverter = require('json-schema-to-typescript')
var resumeSchema = require('resume-schema')
var fs = require('fs')
var path = require('path')

schemaConverter.compile(resumeSchema.schema, 'ResumeSchema').then(typeDef => {
  const outputPath = path.join(
    __dirname,
    '..',
    'src',
    'types',
    'ResumeSchema.ts'
  )

  fs.writeFileSync(outputPath, typeDef)
  console.log(`Succesfully output type definitions to ${outputPath}`)
})
