--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-2.pgdg110+2)
-- Dumped by pg_dump version 16.0

-- Started on 2024-05-31 22:30:55

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

INSERT INTO public.category VALUES ('98a32ab0-96f5-4afe-9311-a1eec23d34dd', 'Food', 'Groceries, produce, and gourmet items');


--
-- TOC entry 3357 (class 0 OID 86808)
-- Dependencies: 217
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product VALUES ('891495bc-bab0-4c40-b550-3f60b4243229', 'Organic Apples', 3.99, 100, 'Fresh organic apples, perfect for a healthy snack.', NULL, 'https://freshindiaorganics.com/cdn/shop/products/Apples.jpg');
INSERT INTO public.product VALUES ('914ebbf6-ab05-44ac-bb25-0ea11570a236', 'Whole Wheat Bread', 2.49, 50, 'Delicious whole wheat bread, baked fresh daily.', NULL, 'https://www.brownberry.com/sites/default/files/recipe/Brownberry%20100%25%20WW.png');
INSERT INTO public.product VALUES ('f12bdf79-a012-41e8-81ac-e0140ca5a997', 'Almond Milk', 4.99, 60, 'Nutritious almond milk, a great dairy-free alternative.', NULL, 'https://images-cdn.ubuy.co.in/659ddf8879b6175be563438a-almond-breeze-vanilla-almond-milk-64-oz.jpg');
INSERT INTO public.product VALUES ('b16233d7-7635-4a77-94b6-ee9a7be909f1', 'Brown Rice', 1.99, 80, 'Healthy and versatile brown rice, ideal for any meal.', NULL, 'https://m.media-amazon.com/images/I/61hI83GWpzL.jpg');
INSERT INTO public.product VALUES ('a1076f54-09de-493d-acce-5f586caccf36', 'Greek Yogurt', 5.49, 40, 'Creamy Greek yogurt, packed with protein.', NULL, 'https://www.bigbasket.com/media/uploads/p/l/40281258_1-milky-mist-greek-yogurt-natural-high-protein-no-added-sugar.jpg');
INSERT INTO public.product VALUES ('fd350c1d-9db1-433c-84f1-a47fd5ca8d07', 'Almarai Cheddar Cheese', 6.99, 30, 'Almarai Cheddar Cheese Slices 200g', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/h24/hd6/50520713297950/480Wx480H_513830_main.jpg');
INSERT INTO public.product VALUES ('cb8186d7-7315-4e56-913d-59e813d9f43e', 'Fresh Salmon', 12.99, 20, 'Fresh salmon fillets, perfect for grilling or baking.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/hb0/h31/9191258718238/5369_main.jpg_480Wx480H');
INSERT INTO public.product VALUES ('f8dcd1b4-e8be-4a58-af07-4fa5a404b284', 'Spinach', 2.99, 70, 'Fresh spinach, great for salads and smoothies.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/h8d/h3e/27519520702494/357132_main.jpg_480Wx480H');
INSERT INTO public.product VALUES ('3806af66-9612-4bdb-8663-d2f1640a02ce', 'Eggs', 3.49, 100, 'Farm fresh eggs, a breakfast staple.', NULL, 'src="https://cdnprod.mafretailproxy.com/sys-master-root/h8c/hd7/51206757056542/480Wx480H_708115_main.jpg"');
INSERT INTO public.product VALUES ('c4c285b0-73ba-46ce-b03e-329a4d5ed875', 'Peanut Butter', 4.49, 60, 'Creamy peanut butter, perfect for spreading.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/hac/hd2/13121518731294/292669_main.jpg_480Wx480H');


--
-- TOC entry 3358 (class 0 OID 86855)
-- Dependencies: 220
-- Data for Name: product_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product_category VALUES ('bf1e1722-bdd9-4f5f-8ec2-723a8d12e3db', '98a32ab0-96f5-4afe-9311-a1eec23d34dd', '891495bc-bab0-4c40-b550-3f60b4243229');
INSERT INTO public.product_category VALUES ('9bac1f34-849d-4bf0-902a-0a30ddfecc16', '98a32ab0-96f5-4afe-9311-a1eec23d34dd', '914ebbf6-ab05-44ac-bb25-0ea11570a236');
INSERT INTO public.product_category VALUES ('88291032-642a-42eb-9c4e-bf1ce976f9b3', '98a32ab0-96f5-4afe-9311-a1eec23d34dd', 'f12bdf79-a012-41e8-81ac-e0140ca5a997');
INSERT INTO public.product_category VALUES ('0ad1c444-3883-406f-b976-7aa6b47d8c5c', '98a32ab0-96f5-4afe-9311-a1eec23d34dd', 'b16233d7-7635-4a77-94b6-ee9a7be909f1');
INSERT INTO public.product_category VALUES ('02441f05-59fe-4e02-90d4-86b5e49c1d3f', '98a32ab0-96f5-4afe-9311-a1eec23d34dd', 'a1076f54-09de-493d-acce-5f586caccf36');
INSERT INTO public.product_category VALUES ('74362011-6801-41a8-9906-51448b79dc74', '98a32ab0-96f5-4afe-9311-a1eec23d34dd', 'fd350c1d-9db1-433c-84f1-a47fd5ca8d07');
INSERT INTO public.product_category VALUES ('96efad7d-15de-4c6b-a031-6d8b9e003866', '98a32ab0-96f5-4afe-9311-a1eec23d34dd', 'cb8186d7-7315-4e56-913d-59e813d9f43e');
INSERT INTO public.product_category VALUES ('fb2e8cca-d182-4585-958c-14022a9438e5', '98a32ab0-96f5-4afe-9311-a1eec23d34dd', 'f8dcd1b4-e8be-4a58-af07-4fa5a404b284');
INSERT INTO public.product_category VALUES ('fbea81ef-27f5-433e-a482-11ed337b94d7', '98a32ab0-96f5-4afe-9311-a1eec23d34dd', '3806af66-9612-4bdb-8663-d2f1640a02ce');
INSERT INTO public.product_category VALUES ('4509024c-5fd4-43f7-aef8-77e6694037d8', '98a32ab0-96f5-4afe-9311-a1eec23d34dd', 'c4c285b0-73ba-46ce-b03e-329a4d5ed875');


-- Completed on 2024-05-31 22:30:56

--
-- PostgreSQL database dump complete
--

