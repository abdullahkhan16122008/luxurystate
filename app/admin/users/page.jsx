"use client";

import AdminLayout from "@/components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Mail, Trash, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsers() {
  const [leads, setLeads] = useState([]);
  let [open, setOpen] = useState(false);
  let [selectedLead, setSelectedLead] = useState('');

  let api = process.env.NEXT_PUBLIC_API_URL;

  let fetchLeads = async () => {
    try {
      let contacts = await axios.post(`${api}/api/get/contacts`);
      if (contacts.data) {
        setLeads(contacts.data.contacts)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchLeads();
  }, [])


  const sendEmail = (email, name) => {
    toast.success(`Email sent to ${name} (${email})`);
  };

  let handleDelete = async (_id) => {
    try {
      let contacts = await axios.post(`${api}/api/delete/contact`, { _id });
      if (contacts.data) {
        setLeads(contacts.data.contacts)
        toast.success(contacts.data.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  let handleOpen = (message) => {
    setSelectedLead(message)
    setOpen(true)
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-bold mb-8">Leads / Users ({leads.length})</h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Message Preview</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead._id}>
                <TableCell className="font-medium">{lead.fullName}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.phoneNumber}</TableCell>
                <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="max-w-xs truncate">{lead.message}</TableCell>
                <TableCell>
                  {/* <Button size="sm" onClick={() => sendEmail(lead.email, lead.name)}>
                    <Mail className="mr-2 h-4 w-4" /> Send Email
                  </Button> */}
                  <Button size="sm" className={`bg-blue-600 mx-2 hover:bg-blue-500 cursor-pointer`} onClick={() => handleOpen(lead.message)}>
                    <Eye className="" />
                  </Button>
                  <Button size="sm" className={`bg-red-600 hover:bg-red-500 cursor-pointer`} onClick={() => handleDelete(lead._id)}>
                    <Trash2 className="" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {open && (
          <section className="fixed justify-items-center top-0 bottom-0 right-0 left-0 z-50">
          <div className="bg-black/60 w-full h-full" onClick={e => {
            setOpen(false)
          }} />
          <div className="absolute top-1/2 z-60 max-w-[75%] rounded-sm bg-white p-5" >
            <div className="text-center">
            <h2 className="text-4xl font-bold my-4">Message</h2>
            <div>{selectedLead}</div>
            </div>
          </div>
        </section>
      )}

        {leads.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No leads yet. When someone fills contact form, they will appear here.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}