export type EmailCompose = {
  sender: string;
  subject: string;
  timestamp: string;
};

export type EmailProps = {
  sender: string;
  subject: string;
  body: string;
};

export type SendEmail = {
  to: string;
  subject: string;
  body: string;
};

export type FolderEmail = {
  recipient_folder: number;
};

export interface EmailInboxRow {
  uuid: string;
  sender: {
    uuid: string;
    full_name: string;
    email: string;
  };
  recipient: {
    uuid: string;
    full_name: string;
    email: string;
  };
  subject: string;
  body: string;
  sent_date: string;
  read_date: string;
  recipient_folder: number;
}

export interface RootState {
  emails: {
    emails: EmailInboxRow[];
    status: string;
  },
  emailsSent: {
    emails: EmailInboxRow[];
    status: string;
  },
  emailsSearch: {
    emails: EmailInboxRow[];
    status: string;
  };
  emailsSentSearch: {
    emails: EmailInboxRow[];
    status: string;
  };
}
export interface StateEmailView {
  emailView: {
    email: EmailInboxRow;
    status: string;
  };
}

export interface EmailFolderDict {
  [key: number]: string;
}
