import { BsInfoCircleFill } from "react-icons/bs";
import Tooltip from '@mui/material/Tooltip';

interface IToolTipProps {
  title: string;
}

export default function ArrowTooltips({ title }: IToolTipProps) {
  return (
    <Tooltip title={title} arrow>
      <div className="pr-1">
        <BsInfoCircleFill size={12} color="#013220"/>
      </div>
    </Tooltip>
  );
}