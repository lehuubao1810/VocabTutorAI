import { CircularProgress } from "@mui/material"

type Props = {
    // type of the props
}

export const Loading: React.FC<Props> = (props) => {
    console.log(props)
    return <div
        className="fixed top-0 left-0 w-full h-screen bg-gray-400 bg-opacity-50 flex items-center justify-center z-50"
    >
        <CircularProgress />
    </div>
}