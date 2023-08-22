import React from 'react';
import { Image, Typography } from '@douyinfe/semi-ui';
import AIOSLOGO from '@/assets/img/TIMUR-AI.png';

const { Text } = Typography;

const ProjectSourceInfo: React.FC = function ProjectSourceInfo() {
  return (
    <div className="flex flex-col items-center h-full dark:bg-gray-800 pt-32">
      <Image preview={false} height="200" width="200" src={AIOSLOGO} />
      <Typography className="text-gray-600 font-medium my-8 dark:text-gray-300 text-xl">
        FOUNDED BY TIMUR
      </Typography>
    </div>
  );
};
export default ProjectSourceInfo;
