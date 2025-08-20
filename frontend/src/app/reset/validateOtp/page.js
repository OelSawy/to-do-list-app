import ValidateOtpClient from "./client";

export const metadata = {
  title: "TickIt - Account Recovery",
  description: "Enter the OTP sent to your email",
};

export default function ValidateOtpPage() {
  return <ValidateOtpClient />;
}
