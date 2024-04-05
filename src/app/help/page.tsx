"use client";
import { SummaryProps, SummarySidebar } from "app/dashboard/sidebar";
import { ComponentNav } from "app/navbarComp";
// import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Card, Accordion } from "flowbite-react";
import Image from "next/image";

function ComponentCard() {
  return (
    <Card
      className="items-center justify-between text-center mx-auto md:w-auto h-60 p-5"
      renderImage={() => <Image width={100} height={90} src="gbudget-logo.png" alt="image 1" className="item-left"/>}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Frequently Asked Questions
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      Find links to SGA resources, descriptions of GBudgets procedure, and a simple tutorial to submit your first budget!!
      </p>
    </Card>
  );
}

function ComponentAcc() {
  return (
    <Accordion className="bg-pallete-2 items-center justify-between mx-auto md:w-auto h-screen">
      <Accordion.Panel>
        <Accordion.Title className="bg-gray-100 flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 dark:text-gray-400 gap-3">
          How do I know when my budget is approved?
        </Accordion.Title>
        <Accordion.Content className="bg-white">
          <p className="text-gray-500 dark:text-gray-400">
            Check the status of the budget plan! If the status becomes to "Approved", the budget plan is approved by SGA treasure, and you can start the next process! If the status is "Denied", you are able to see the comments from the SGA treasure, modify and resubmit the budget plan. If the status is "Pending", please give SGA treasure more time to go through your budget plan!
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Check out this guide to learn how to&nbsp;
            and start developing websites even faster with components on top of Tailwind CSS.
          </p>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title className="flex bg-gray-100 items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 dark:text-gray-400 gap-3">
          How do I download/reuse my past budget?
        </Accordion.Title>
        <Accordion.Content className="bg-white">
          <p className="text-gray-500 dark:text-gray-400 ">
            You can click the "Duplicate event" button on the right side of each budget plan to reuse the past budgets. 
          </p>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title className="flex bg-gray-100 items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 dark:text-gray-400 gap-3">
          Tutorials: Make and submit your first budget!!!
        </Accordion.Title>
        <Accordion.Content className="bg-white">
          <p className="text-gray-500 dark:text-gray-400">
            The main difference is that the core components from Flowbite are open source under the MIT license, whereas
            Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone
            components, whereas Tailwind UI offers sections of pages.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no
            technical reason stopping you from using the best of two worlds.
          </p>
          <p className="text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
          <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
          </ul>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title className="flex bg-gray-100 items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 dark:text-gray-400 gap-3">
          How do I contact the SGA treasure when the budget plan has been under review for a long time?
        </Accordion.Title>
        <Accordion.Content className="bg-white">
          <p className="text-gray-500 dark:text-gray-400">
            You can click the "Contact" tab on the top of the website to find the contact info for SGA treasure. 
          </p>
          <p className="text-gray-500 dark:text-gray-400">
          Or you can click the "request review" button again to remind the SGA treasure to review the budget plan as soon as possible. 
          </p>
          <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
          </ul>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title className="flex bg-gray-100 items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 dark:text-gray-400 gap-3">
          Are there any security measures to protect the privacy?
        </Accordion.Title>
        <Accordion.Content className="bg-white">
          <p className="text-gray-500 dark:text-gray-400">
            
          </p>
          <p className="text-gray-500 dark:text-gray-400">
          
          </p>
          <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
          </ul>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title className="flex bg-gray-100 items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 dark:text-gray-400 gap-3">
          What if the question I want to ask is not covered in the Q&A page?
        </Accordion.Title>
        <Accordion.Content className="bg-white">
          <p className="text-gray-500 dark:text-gray-400">
            You can upload more questions here (link), and the developingt team will publish the answer as soon as possible. 
          </p>
          <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
          </ul>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
}



export default function Home() {
  const dummyUserSummary: SummaryProps = {
    total: 1000,
    remaining: 400,
    pendingEvents: 5,
    plannedEvents: 10,
    completedEvents: 10
  }
  return (
    <main>
      {/* <ComponentNav name ="Log Out"/> */}
      {/* <SummarySidebar {...dummyUserSummary}/> */}
      <ComponentCard/>
      <ComponentAcc/>


    </main>
  )
}