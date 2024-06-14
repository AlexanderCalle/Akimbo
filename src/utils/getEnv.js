
export const getEnv = () => {
  const env = process.env.NODE_ENV;
  console.log(env)

  if(env === "production") {
    return ""
  }

  return "_dev"
}