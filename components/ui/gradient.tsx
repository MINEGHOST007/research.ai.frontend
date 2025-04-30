export function Gradient() {
  return (
    <>
      <div
        className="absolute top-0 right-0 w-[80%] h-[80%] bg-gradient-to-bl from-amber-900/20 via-transparent to-transparent opacity-60 blur-3xl"
        style={{ transform: "translate(20%, -20%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[80%] h-[80%] bg-gradient-to-tr from-zinc-900 via-zinc-800/20 to-transparent opacity-60 blur-3xl"
        style={{ transform: "translate(-20%, 20%)" }}
      />
    </>
  )
}
