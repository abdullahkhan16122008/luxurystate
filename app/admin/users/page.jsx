"use client";

import AdminLayout from "@/components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsers() {
     const [ leads, setLeads ] = useState([]);
    
      let api = process.env.NEXT_PUBLIC_API_URL;
    
      let fetchLeads = async () => {
        try {
            let contacts = await axios.post(`${api}/api/get/contacts`);
            if(contacts.data) {
                setLeads(contacts.data.contacts)
            }
        } catch (err) {
        console.log(err)
      }
    }
    
      useEffect(()=> {
        fetchLeads();
      }, [])
    

  const sendEmail = (email, name) => {
    toast.success(`Email sent to ${name} (${email})`);
  };

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
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.fullName}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.phoneNumber}</TableCell>
                <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="max-w-xs truncate">{lead.message}</TableCell>
                <TableCell>
                  <Button size="sm" onClick={() => sendEmail(lead.email, lead.name)}>
                    <Mail className="mr-2 h-4 w-4" /> Send Email
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {leads.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No leads yet. When someone fills contact form, they will appear here.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}