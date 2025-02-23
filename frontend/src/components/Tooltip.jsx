import TooltipComponent from '@mui/material/Tooltip'

const Tooltip = ({ children, label }) => {
    return (
        <TooltipComponent arrow title={label}>
            {children}
        </TooltipComponent>
    )
}

export default Tooltip
