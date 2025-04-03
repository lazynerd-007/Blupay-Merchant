import React from "react";

export const MessageIcon: React.FC = () => (
  <div className="flex shrink-0 self-stretch my-auto h-[30px] w-[30px] items-center justify-center">
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.8333 3.33334H4.16667C3.24619 3.33334 2.5 4.07953 2.5 5.00001V15C2.5 15.9205 3.24619 16.6667 4.16667 16.6667H15.8333C16.7538 16.6667 17.5 15.9205 17.5 15V5.00001C17.5 4.07953 16.7538 3.33334 15.8333 3.33334Z"
        stroke="#94A3B8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 5.83334L10 10.8333L17.5 5.83334"
        stroke="#94A3B8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export const LockIcon: React.FC = () => (
  <div className="flex shrink-0 self-stretch my-auto h-[30px] w-[30px] items-center justify-center">
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.8333 9.16666H4.16667C3.24619 9.16666 2.5 9.91285 2.5 10.8333V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V10.8333C17.5 9.91285 16.7538 9.16666 15.8333 9.16666Z"
        stroke="#94A3B8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.83333 9.16666V5.83332C5.83333 4.72825 6.27232 3.66845 7.05372 2.88704C7.83512 2.10564 8.89493 1.66666 10 1.66666C11.1051 1.66666 12.1649 2.10564 12.9463 2.88704C13.7277 3.66845 14.1667 4.72825 14.1667 5.83332V9.16666"
        stroke="#94A3B8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export const EyeSlashIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.7667 11.7667L8.23333 8.23333C7.55833 8.90833 7.08333 9.85 7.08333 10.8333C7.08333 12.8 8.675 14.3917 10.6417 14.3917C11.625 14.3917 12.5667 13.9167 13.2417 13.2417"
      stroke="#94A3B8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.85 15.8583C13.3917 16.925 11.7667 17.5 10 17.5C6.25 17.5 2.91667 15 1.25 10.8333C1.93333 8.75 3.05 7 4.51667 5.75M7.08333 4.14167C8 3.71667 9 3.33333 10 3.33333C13.75 3.33333 17.0833 5.83333 18.75 10C18.4083 10.9833 17.9833 11.8833 17.5 12.6833"
      stroke="#94A3B8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.1667 10.8333C14.1667 8.86667 12.575 7.275 10.6083 7.275"
      stroke="#94A3B8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.66667 1.66667L18.3333 18.3333"
      stroke="#94A3B8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const EyeIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 4.16667C13.75 4.16667 17.0833 6.66667 18.75 10.8333C17.0833 15 13.75 17.5 10 17.5C6.25 17.5 2.91667 15 1.25 10.8333C2.91667 6.66667 6.25 4.16667 10 4.16667Z"
      stroke="#94A3B8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 14.1667C11.841 14.1667 13.3333 12.6743 13.3333 10.8333C13.3333 8.99238 11.841 7.50001 10 7.50001C8.15905 7.50001 6.66667 8.99238 6.66667 10.8333C6.66667 12.6743 8.15905 14.1667 10 14.1667Z"
      stroke="#94A3B8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface CheckboxIconProps {
  checked: boolean;
}

export const CheckboxIcon: React.FC<CheckboxIconProps> = ({ checked }) => (
  <div className="object-contain overflow-hidden w-6 aspect-square">
    {checked ? (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#1D4ED8" />
        <path
          d="M8 12L11 15L16 9"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="4"
          stroke="#94A3B8"
          strokeWidth="1.5"
          fill="white"
        />
      </svg>
    )}
  </div>
);
