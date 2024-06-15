
export const getEnv = () => {
  const env = process.env.NODE_ENV;

  if(env === "production") {
    return ""
  }

  return "_dev"
}