--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-2.pgdg110+2)
-- Dumped by pg_dump version 16.0

-- Started on 2024-05-31 22:21:13

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

INSERT INTO public.category VALUES ('5b0f652e-8668-40ba-be2b-860496bc2db4', 'Baby', 'Everything for your little one');


--
-- TOC entry 3357 (class 0 OID 86808)
-- Dependencies: 217
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product VALUES ('5d299ce6-2f2b-4a77-99aa-40b175cba1ca', 'Baby Stroller', 199.99, 25, 'A comfortable and sturdy baby stroller for your little one.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/hc3/h7d/63251379585054/480Wx480H_8809627790385_main');
INSERT INTO public.product VALUES ('ddbeddb2-4393-49c0-89b2-fffab642ad40', 'Baby Car Seat', 149.99, 30, 'A safe and secure car seat for infants.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/h38/h38/62664045756446/480Wx480H_793150189502_main');
INSERT INTO public.product VALUES ('e16cb677-3bad-45b9-807f-fecdba5f375a', 'Baby Crib', 299.99, 15, 'A cozy crib for your baby''s sweet dreams.', NULL, 'https://media.centrepointstores.com/i/centrepoint/F01-5451A-Multicolour-F01-5451A-SM14BS57_01-2100.jpg');
INSERT INTO public.product VALUES ('97055246-2a32-4156-9004-9353e407e29a', 'Baby High Chair', 89.99, 20, 'A high chair that grows with your baby.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/h60/h8f/30736417390622/8058664016525_main_480Wx480H');
INSERT INTO public.product VALUES ('62f659be-bbb5-4ca1-8b31-4c2c75849ddf', 'Baby Monitor', 79.99, 50, 'A reliable baby monitor with night vision.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/h5d/hc6/63474065932318/480Wx480H_850039822056_main');
INSERT INTO public.product VALUES ('4367941e-612b-43cc-afe4-da8db3e16c48', 'Baby Diapers', 29.99, 200, 'Soft and absorbent diapers for your baby.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/h06/h01/9214818844702/585392_main.jpg_480Wx480H');
INSERT INTO public.product VALUES ('200475ca-4e37-4143-ae6a-ed1e77b6bc96', 'Baby Wipes', 19.99, 150, 'Gentle baby wipes for sensitive skin.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/hcf/hef/50853129519134/480Wx480H_610787_main.jpg');
INSERT INTO public.product VALUES ('54129e14-ebc7-457c-bf9a-546b0eef81be', 'Baby Bottle', 9.99, 100, 'A BPA-free bottle for easy feeding.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/h32/h0f/12408614944798/619003_main.jpg_480Wx480H');
INSERT INTO public.product VALUES ('d1a7fe0e-f577-46e2-9a07-8bb243e19060', 'Baby Pacifier', 5.99, 200, 'A silicone pacifier for soothing your baby.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/hc8/he6/50172268380190/480Wx480H_1010071394_main');
INSERT INTO public.product VALUES ('02680047-fd20-40a0-9462-da3aa307b8f4', 'Baby Bath Tub', 39.99, 40, 'A portable and safe bath tub for babies.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/h38/h87/63373667500062/480Wx480H_8682835421391_main');
INSERT INTO public.product VALUES ('da8b8bd6-864f-4b9d-bbb0-940c5baa8281', 'Baby Shampoo', 7.99, 120, 'Gentle shampoo for your baby''s hair.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/hd4/hfb/13137406689310/628888_main.jpg_480Wx480H');
INSERT INTO public.product VALUES ('d31e44d3-dcc8-451c-8f0c-94ce2b42f968', 'Baby Lotion', 8.99, 100, 'Moisturizing lotion for your baby''s skin.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/hf7/h7d/9959585284126/628882_main.jpg_480Wx480H');
INSERT INTO public.product VALUES ('bf11daba-10d0-4db9-a4bd-de2f48ca5f8b', 'Baby Blanket', 15.99, 60, 'A soft and warm blanket for your baby.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/hed/h20/50171176747038/480Wx480H_8682835421667_main');
INSERT INTO public.product VALUES ('f7a493ad-d5c4-499b-abe5-777d251ab187', 'Baby Swing', 129.99, 15, 'A soothing swing for your baby to relax.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/h17/ha1/63125731377182/480Wx480H_8809732861826_main');
INSERT INTO public.product VALUES ('4e686b94-998c-4da5-bc8d-bd69ce654bbc', 'Baby Play Mat', 49.99, 40, 'An interactive play mat for your baby.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/h26/hb4/51091291668510/480Wx480H_1259931008006_main');
INSERT INTO public.product VALUES ('c4a814fc-9222-41db-bd48-7548966931c6', 'Baby Walker', 69.99, 25, 'A walker to help your baby take their first steps.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/h9d/hed/63305651683358/480Wx480H_8809732911569_main');
INSERT INTO public.product VALUES ('665682a1-53dc-435d-92dd-1d7703758bcd', 'Baby Teether', 6.99, 150, 'A safe teether to soothe your baby''s gums.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/h66/ha9/46004403568670/480Wx480H_655315_main.jpg');
INSERT INTO public.product VALUES ('c2d5e2d1-361f-4caf-8ef0-4c2c1a209d69', 'Baby Feeding Set', 24.99, 80, 'A complete feeding set for your baby.', NULL, 'https://m.media-amazon.com/images/I/61jbWj+RTfL._AC_UF894,1000_QL80_.jpg');
INSERT INTO public.product VALUES ('a2b0076e-4288-4393-aa6e-74b905721aef', 'Baby Carrier', 79.99, 30, 'A comfortable carrier for hands-free carrying.', NULL, 'https://m.media-amazon.com/images/I/612-4Z5wGiL._AC_UF894,1000_QL80_.jpg');
INSERT INTO public.product VALUES ('d66d2751-9788-4e92-922b-3625b9fd0aa9', 'Baby Thermometer', 19.99, 50, 'A digital thermometer for accurate readings.', NULL, 'https://m.media-amazon.com/images/I/71IAzZtUelL._AC_UF1000,1000_QL80_.jpg');
INSERT INTO public.product VALUES ('2680bbdb-299e-4471-8fa2-987d80672378', 'Baby Bib', 4.99, 200, 'A soft and absorbent bib for mealtime.', NULL, 'https://m.media-amazon.com/images/I/31TXuyYJd9L._AC_.jpg');


--
-- TOC entry 3358 (class 0 OID 86855)
-- Dependencies: 220
-- Data for Name: product_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product_category VALUES ('9628a11c-be2e-4c37-9e8e-dcd97498a697', '5b0f652e-8668-40ba-be2b-860496bc2db4', '5d299ce6-2f2b-4a77-99aa-40b175cba1ca');
INSERT INTO public.product_category VALUES ('11657f4f-fd14-450b-a098-e44b1510a8a4', '5b0f652e-8668-40ba-be2b-860496bc2db4', 'ddbeddb2-4393-49c0-89b2-fffab642ad40');
INSERT INTO public.product_category VALUES ('a32039fe-0b7a-4db5-a948-51282d8033bd', '5b0f652e-8668-40ba-be2b-860496bc2db4', 'e16cb677-3bad-45b9-807f-fecdba5f375a');
INSERT INTO public.product_category VALUES ('2b8d76c3-b065-49b8-bcaf-a2fa5cd7ce6f', '5b0f652e-8668-40ba-be2b-860496bc2db4', '97055246-2a32-4156-9004-9353e407e29a');
INSERT INTO public.product_category VALUES ('a200a69c-b859-49c9-8527-f2d977e24736', '5b0f652e-8668-40ba-be2b-860496bc2db4', '62f659be-bbb5-4ca1-8b31-4c2c75849ddf');
INSERT INTO public.product_category VALUES ('9e8249e5-33fc-48a1-a6a9-e07918a4fb38', '5b0f652e-8668-40ba-be2b-860496bc2db4', '4367941e-612b-43cc-afe4-da8db3e16c48');
INSERT INTO public.product_category VALUES ('09ff6ea8-6bde-48f2-8bb4-d8ea6d44079d', '5b0f652e-8668-40ba-be2b-860496bc2db4', '200475ca-4e37-4143-ae6a-ed1e77b6bc96');
INSERT INTO public.product_category VALUES ('3721b4b7-6323-4c64-9bcf-4b1d7360bce5', '5b0f652e-8668-40ba-be2b-860496bc2db4', '54129e14-ebc7-457c-bf9a-546b0eef81be');
INSERT INTO public.product_category VALUES ('f583467f-928f-4882-a99c-06127cf45cb1', '5b0f652e-8668-40ba-be2b-860496bc2db4', 'd1a7fe0e-f577-46e2-9a07-8bb243e19060');
INSERT INTO public.product_category VALUES ('9d43f1b5-9892-4133-b4d6-ca15600e1f5d', '5b0f652e-8668-40ba-be2b-860496bc2db4', '02680047-fd20-40a0-9462-da3aa307b8f4');
INSERT INTO public.product_category VALUES ('28928fb3-15cf-40a3-bf8d-e68bf4aa0cf8', '5b0f652e-8668-40ba-be2b-860496bc2db4', 'da8b8bd6-864f-4b9d-bbb0-940c5baa8281');
INSERT INTO public.product_category VALUES ('7f432720-3cdf-40aa-9a43-09953fd9d54a', '5b0f652e-8668-40ba-be2b-860496bc2db4', 'd31e44d3-dcc8-451c-8f0c-94ce2b42f968');
INSERT INTO public.product_category VALUES ('681f2fb9-44de-46c5-8dc9-5555f0c4511f', '5b0f652e-8668-40ba-be2b-860496bc2db4', 'bf11daba-10d0-4db9-a4bd-de2f48ca5f8b');
INSERT INTO public.product_category VALUES ('6939d23c-3861-460d-82e8-5506e5b64c5a', '5b0f652e-8668-40ba-be2b-860496bc2db4', 'f7a493ad-d5c4-499b-abe5-777d251ab187');
INSERT INTO public.product_category VALUES ('fcd71c34-f749-4b54-92d8-0da733e1cb3c', '5b0f652e-8668-40ba-be2b-860496bc2db4', '4e686b94-998c-4da5-bc8d-bd69ce654bbc');
INSERT INTO public.product_category VALUES ('4c2faf7f-bacf-4027-ad15-f68f4a4efff4', '5b0f652e-8668-40ba-be2b-860496bc2db4', 'c4a814fc-9222-41db-bd48-7548966931c6');
INSERT INTO public.product_category VALUES ('71b77da8-f488-4b76-97ab-099fb39eec08', '5b0f652e-8668-40ba-be2b-860496bc2db4', '665682a1-53dc-435d-92dd-1d7703758bcd');
INSERT INTO public.product_category VALUES ('8fcc1d57-d1dc-4f0c-92f0-face7807381a', '5b0f652e-8668-40ba-be2b-860496bc2db4', 'c2d5e2d1-361f-4caf-8ef0-4c2c1a209d69');
INSERT INTO public.product_category VALUES ('b554eb6c-a74b-433e-b9c7-e6c1778a7ebb', '5b0f652e-8668-40ba-be2b-860496bc2db4', 'a2b0076e-4288-4393-aa6e-74b905721aef');
INSERT INTO public.product_category VALUES ('5ee35315-4114-459f-bf61-461e7f091264', '5b0f652e-8668-40ba-be2b-860496bc2db4', 'd66d2751-9788-4e92-922b-3625b9fd0aa9');
INSERT INTO public.product_category VALUES ('58096a63-0785-46c4-b7b2-3e6fa6a6bb39', '5b0f652e-8668-40ba-be2b-860496bc2db4', '2680bbdb-299e-4471-8fa2-987d80672378');


-- Completed on 2024-05-31 22:21:13

--
-- PostgreSQL database dump complete
--

