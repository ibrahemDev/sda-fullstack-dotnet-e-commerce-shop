--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-2.pgdg110+2)
-- Dumped by pg_dump version 16.0

-- Started on 2024-05-31 22:26:02

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3356 (class 0 OID 86726)
-- Dependencies: 211
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.category VALUES ('bcc07b7e-1df0-427a-8948-75f4c8b52271', 'Video Games', 'Consoles, games, and accessories');


--
-- TOC entry 3357 (class 0 OID 86808)
-- Dependencies: 217
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product VALUES ('77b57921-2329-462d-870a-05126e8b1263', 'Cyberpunk 2077', 59.99, 35, 'An open-world, action-adventure story set in Night City.', NULL, 'https://i.im.ge/2024/05/30/KLi3qa.edb17363ae5a4d4b8f53a0c1f7110407.jpeg');
INSERT INTO public.product VALUES ('97b41729-bb09-41fc-beb2-f37ede95adeb', 'The Witcher 3: Wild Hunt', 39.99, 50, 'A story-driven, next-generation open-world role-playing game.', NULL, 'https://i.im.ge/2024/05/30/KLiYPJ.16c85b8611034a4593e3009d218cf174.jpeg');
INSERT INTO public.product VALUES ('12df9168-00fa-4958-ab9d-d7a031d1a3ff', 'Red Dead Redemption 2', 49.99, 45, 'An epic tale of life in America’s unforgiving heartland.', NULL, 'https://i.im.ge/2024/05/30/KLibky.ab881ec4a13d47d09f641de6baa9125e.jpeg');
INSERT INTO public.product VALUES ('5a7fcc69-be7d-449f-8796-6760916a0669', 'The Last of Us Part II', 59.99, 40, 'A story about complex characters and their emotional journeys.', NULL, 'https://images.playground.com/5808cbcb13064fb0951f3d75b701ee7e.jpeg');
INSERT INTO public.product VALUES ('6c7ca1d6-6a2c-4fbd-91d8-c21dbd640959', 'God of War', 29.99, 30, 'A bold new beginning for Kratos.', NULL, 'https://images.playground.com/a4d85b81c51d4757aded047d10944be0.jpeg');
INSERT INTO public.product VALUES ('4434c39a-d22b-4563-b8e4-ee4547bbba7e', 'Spider-Man: Miles Morales', 49.99, 25, 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.', NULL, 'https://images.playground.com/26dc5afebaa74d3fb6d640f72f8aef4c.jpeg');
INSERT INTO public.product VALUES ('1d23aea9-54bf-42ca-96a3-0919ec837307', 'Horizon Zero Dawn', 19.99, 40, 'An exhilarating action role playing game.', NULL, 'https://images.playground.com/13b83d461f1e4fbd943068899611b9fe.jpeg');
INSERT INTO public.product VALUES ('680b36fe-485b-46fa-94ea-e9623d983826', 'Ghost of Tsushima', 59.99, 20, 'A stunning action-adventure from Sucker Punch Productions.', NULL, 'https://fly.storage.tigris.dev/pai-images/cb232f932f4b41f9b465c1dc2931d99d.jpeg');
INSERT INTO public.product VALUES ('76b92fda-c641-4fe9-88b8-393740d82502', 'Sekiro: Shadows Die Twice', 39.99, 30, 'A single-player action-adventure game with RPG elements.', NULL, 'https://fly.storage.tigris.dev/pai-images/b923ff86092849a19e49b04516043d3d.jpeg');
INSERT INTO public.product VALUES ('159f5e90-724b-43e2-bfc4-edfa2ddef2d6', 'Assassin''s Creed Valhalla', 59.99, 45, 'Become Eivor, a legendary Viking warrior.', NULL, 'https://images.playground.com/4431bc9c86524cea9264671733c311b5.jpeg');
INSERT INTO public.product VALUES ('a386e7a0-3ad3-4273-bcc2-8de1888cb987', 'Doom Eternal', 29.99, 50, 'Experience the ultimate combination of speed and power.', NULL, 'https://store-images.s-microsoft.com/image/apps.33238.14633846388270955.34167af5-fabe-4bb4-87d1-87f313b6f79c.8165f981-23a0-4be9-a216-af0159ccfcba');
INSERT INTO public.product VALUES ('494a05f1-ab56-4e81-988b-26623365dec2', 'Call of Duty: Modern Warfare', 49.99, 60, 'The stakes have never been higher as players take on the role of lethal Tier One operators.', NULL, 'https://store-images.s-microsoft.com/image/apps.64815.69193298161071220.7c147b76-ab45-48fc-95ce-70c11df6b921.ba77bc1a-caca-4216-bca2-00eef00deef1');
INSERT INTO public.product VALUES ('6f0d0dcd-9250-4c53-9d0a-e605f85967a6', 'Battlefield V', 29.99, 70, 'Enter mankind’s greatest conflict with Battlefield V.', NULL, 'https://fly.storage.tigris.dev/pai-images/439c312c3a1a4af58f51b66e2b168fc4.jpeg');
INSERT INTO public.product VALUES ('94bf7bd5-7d8f-49ba-a6af-505e6a9e82d7', 'Gears 5', 39.99, 55, 'The latest entry into the iconic Gears series.', NULL, 'https://m.media-amazon.com/images/M/MV5BYjY3MzVmMGMtMjU5OS00YzU3LTk3OWEtYTI4Yjg3ZTBhM2U5XkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_.jpg');
INSERT INTO public.product VALUES ('5a587450-26c1-44ce-bdb3-c01a020fbb16', 'Forza Horizon 4', 49.99, 65, 'Dynamic seasons change everything at the world’s greatest automotive festival.', NULL, 'https://store-images.s-microsoft.com/image/apps.29799.14582624973508592.2000000000007863648.c6853463-3ddd-4434-ba48-0661d492be61');
INSERT INTO public.product VALUES ('175faee8-a82b-46c6-bce9-fd51304768fb', 'FIFA 21', 59.99, 75, 'Win as One in EA SPORTS™ FIFA 21.', NULL, 'https://assets.goal.com/images/v3/bltde95f09fad0ce0f3/f7503bfbd076bcb69f0957343c00be42da8f388d.jpg');
INSERT INTO public.product VALUES ('22236dab-d5b3-4950-a1a5-9f88cc0b621d', 'NBA 2K21', 59.99, 80, 'Experience next-gen gaming with NBA 2K21.', NULL, 'https://tv-it.com/storage/zyad/27-8-2023/nba-2k21-05.webp');
INSERT INTO public.product VALUES ('c218972e-666a-4cc7-9c83-6f8e7ce22b12', 'Madden NFL 21', 49.99, 50, 'Rise to fame and become immortalized in Madden NFL 21.', NULL, 'https://images.stockx.com/images/EA-Sports-PS4-PS5-Madden-NFL-21-Video-Game.jpg?fit=fill&bg=FFFFFF&w=480&h=320&fm=webp&auto=compress&dpr=2&trim=color&updated_at=1606342747&q=60');
INSERT INTO public.product VALUES ('bf0e1cd7-38aa-4c48-90bb-6874f4a20e1a', 'Resident Evil 3', 39.99, 40, 'Witness the climactic events of Raccoon City in a reimagined Resident Evil 3.', NULL, 'https://image.api.playstation.com/vulcan/ap/rnd/202206/0206/WmriZBRlSeXWEEDLJOWW7MdW.png');
INSERT INTO public.product VALUES ('410733e4-aa47-4fdf-9fda-bf63e8715aea', 'Final Fantasy VII Remake', 59.99, 30, 'A spectacular reimagining of one of the most visionary games ever.', NULL, 'https://image.api.playstation.com/vulcan/img/cfn/11307-dNapclgq_VqNtQ98Xp_LxovvAdjd5AknZhd_-k2Cckq9FPtKDXAHk-ODCfvDKChH6hkEO0VLtj7Vk4E-Z8G707oe0N.png');


--
-- TOC entry 3358 (class 0 OID 86855)
-- Dependencies: 220
-- Data for Name: product_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product_category VALUES ('9010cf01-cde6-4db1-991b-dd28e3b40bc4', 'bcc07b7e-1df0-427a-8948-75f4c8b52271', '77b57921-2329-462d-870a-05126e8b1263');
INSERT INTO public.product_category VALUES ('e8af74c5-f6e1-45aa-ae5d-b0c6171c7dfc', 'bcc07b7e-1df0-427a-8948-75f4c8b52271', '97b41729-bb09-41fc-beb2-f37ede95adeb');
INSERT INTO public.product_category VALUES ('d9e29e9c-b6bb-4d93-8ced-6676da55cb3e', 'bcc07b7e-1df0-427a-8948-75f4c8b52271', '12df9168-00fa-4958-ab9d-d7a031d1a3ff');
INSERT INTO public.product_category VALUES ('f022ab0a-b2b1-40d5-bdde-eec332ae1342', 'bcc07b7e-1df0-427a-8948-75f4c8b52271', '5a7fcc69-be7d-449f-8796-6760916a0669');
INSERT INTO public.product_category VALUES ('2e22922b-1f53-4170-a6c2-070581210ac0', 'bcc07b7e-1df0-427a-8948-75f4c8b52271', '6c7ca1d6-6a2c-4fbd-91d8-c21dbd640959');
INSERT INTO public.product_category VALUES ('0dd5d72d-8e4b-4b55-9380-98b424272d7c', 'bcc07b7e-1df0-427a-8948-75f4c8b52271', '4434c39a-d22b-4563-b8e4-ee4547bbba7e');
INSERT INTO public.product_category VALUES ('cb79bab1-0b36-48e1-8c26-c49a844d2678', 'bcc07b7e-1df0-427a-8948-75f4c8b52271', '1d23aea9-54bf-42ca-96a3-0919ec837307');
INSERT INTO public.product_category VALUES ('e1804c05-c934-49e5-ac20-ea0bf387feb3', 'bcc07b7e-1df0-427a-8948-75f4c8b52271', '680b36fe-485b-46fa-94ea-e9623d983826');
INSERT INTO public.product_category VALUES ('4b9d15a6-d00a-4dc8-a735-0fdf8056d0ba', 'bcc07b7e-1df0-427a-8948-75f4c8b52271', '76b92fda-c641-4fe9-88b8-393740d82502');
INSERT INTO public.product_category VALUES ('6902638c-c539-4e64-a11a-635f15e342eb', 'bcc07b7e-1df0-427a-8948-75f4c8b52271', '159f5e90-724b-43e2-bfc4-edfa2ddef2d6');
INSERT INTO public.product_category VALUES ('e1e4114f-3f63-497e-bb85-d18c417c2066', 'bcc07b7e-1df0-427a-8948-75f4c8b52271', 'a386e7a0-3ad3-4273-bcc2-8de1888cb987');
INSERT INTO public.product_category VALUES ('f8871201-2eed-44f5-86fd-875e88564fd3', 'bcc07b7e-1df0-427a-8948-75f4c8b52271', '494a05f1-ab56-4e81-988b-26623365dec2');
INSERT INTO public.product_category VALUES ('223c3fa8-4801-4f69-907a-bec7177263c2', 'bcc07b7e-1df0-427a-8948-75f4c8b52271', '6f0d0dcd-9250-4c53-9d0a-e605f85967a6');
INSERT INTO public.product_category VALUES ('ca95693a-e668-4d5d-94a1-2916f15d147b', 'bcc07b7e-1df0-427a-8948-75f4c8b52271', '94bf7bd5-7d8f-49ba-a6af-505e6a9e82d7');
INSERT INTO public.product_category VALUES ('b60bda65-c887-42a4-a30e-a6457f9ebf90', 'bcc07b7e-1df0-427a-8948-75f4c8b52271', '5a587450-26c1-44ce-bdb3-c01a020fbb16');
INSERT INTO public.product_category VALUES ('265ad925-0886-4428-a0fb-821ce5f9f9bb', 'bcc07b7e-1df0-427a-8948-75f4c8b52271', '175faee8-a82b-46c6-bce9-fd51304768fb');
INSERT INTO public.product_category VALUES ('99bc3e8a-f0d2-4c0f-8867-664180b1b6d6', 'bcc07b7e-1df0-427a-8948-75f4c8b52271', '22236dab-d5b3-4950-a1a5-9f88cc0b621d');
INSERT INTO public.product_category VALUES ('0e3f2dcf-66ce-48d3-9c29-2a16d2d77789', 'bcc07b7e-1df0-427a-8948-75f4c8b52271', 'c218972e-666a-4cc7-9c83-6f8e7ce22b12');
INSERT INTO public.product_category VALUES ('df61f816-1b97-47a1-85e5-5f412c1ac04e', 'bcc07b7e-1df0-427a-8948-75f4c8b52271', 'bf0e1cd7-38aa-4c48-90bb-6874f4a20e1a');
INSERT INTO public.product_category VALUES ('13b69b86-0339-437c-b49c-d3189121abec', 'bcc07b7e-1df0-427a-8948-75f4c8b52271', '410733e4-aa47-4fdf-9fda-bf63e8715aea');


-- Completed on 2024-05-31 22:26:02

--
-- PostgreSQL database dump complete
--

