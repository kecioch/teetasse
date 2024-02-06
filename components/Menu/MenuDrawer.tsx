"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ModalStates, closeModal } from "@/redux/features/modalSlice";
import { Category } from "@/types/category";
import { Accordion } from "flowbite-react";
import { LinkSectionData } from "@/types/linkSection";
import Link from "next/link";
import SideBar from "../UI/Modals/SideBar";

interface Props {
  categories?: Category[];
}

const MenuDrawer = ({ categories = [] }: Props) => {
  const showModal =
    useAppSelector((state) => state.modal.showModal) === ModalStates.MENU;
  const dispatch = useAppDispatch();

  // CONSTRUCT LINKS FOR MENU
  const links: LinkSectionData[] = [];
  categories?.forEach((item, index) => {
    const linkSection: LinkSectionData = {
      title: item.title,
      items: item.subs.map((subItem) => ({
        title: subItem.title,
        href: `/products?categoryId=${item.id}&subcategoryId=${subItem.id}&refresh=true`,
      })),
    };
    links.push(linkSection);
  });
  links.push({
    title: "Profil",
    items: [
      {
        title: "Accountdaten",
        href: "/profile",
      },
      {
        title: "Bestellungen",
        href: "/profile/orders",
      },
    ],
  });

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <SideBar show={showModal} name="Menü" title="Menü">
      <Accordion className="rounded-none [&_button]:first:rounded-none">
        {links.map((item, index) => (
          <Accordion.Panel key={index}>
            <Accordion.Title className="uppercase font-normal">
              {item.title}
            </Accordion.Title>
            <Accordion.Content>
              <ul>
                {item.items.map((sub, index) => (
                  <li
                    key={index}
                    className="font-light mt-5 first:mt-0 text-center transition-all eas hover:text-green-950"
                  >
                    <Link href={sub.href}>
                      <button onClick={handleClose}>{sub.title}</button>
                    </Link>
                  </li>
                ))}
              </ul>
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
    </SideBar>
  );
};

export default MenuDrawer;
