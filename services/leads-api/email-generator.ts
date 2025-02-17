import { SearchCompanyResult } from "@/types/search-leads.types";
import leadsApi from ".";

interface GenerateEmailResponse {
  emailText: string;

  email: string;
}

interface GenerateMultipleEmailsResponse {
  emailTexts: GenerateEmailResponse[];
}

export const generateSingleEmail = async (
  projectId: string,
  lead: SearchCompanyResult
) => {
  const res = await leadsApi.post<GenerateEmailResponse>(
    `/email-generator/single/${projectId}`,
    {
      lead,
    }
  );
  return res.data;
};

export const generateMultipleEmails = async (
  projectId: string,
  leads: SearchCompanyResult[]
) => {
  const res = await leadsApi.post<GenerateMultipleEmailsResponse>(
    `/email-generator/batch/${projectId}`,
    {
      leads,
    }
  );
  return res.data;
};
