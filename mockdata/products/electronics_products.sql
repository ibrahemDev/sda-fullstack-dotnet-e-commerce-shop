--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-2.pgdg110+2)
-- Dumped by pg_dump version 16.0

-- Started on 2024-05-31 22:34:48

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

INSERT INTO public.category VALUES ('81bedd30-0dca-40c0-8a35-c14a94d59236', 'Electronics', 'Cell phones, computers, tablets, and more');


--
-- TOC entry 3357 (class 0 OID 86808)
-- Dependencies: 217
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product VALUES ('48a092a9-1ecf-4998-a258-aaa86c574155', 'iPhone 13', 999.99, 50, 'The latest Apple smartphone with A15 Bionic chip and advanced camera system.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/h5d/h33/49594331955230/480Wx480H_666968_main.jpg');
INSERT INTO public.product VALUES ('b24c1fb1-5156-4504-9c66-e5d5ef2363c9', 'Samsung Galaxy A14', 799.99, 45, 'High-end smartphone with an immersive display and powerful performance.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/he4/hb4/49411780247582/480Wx480H_703460_main.jpg');
INSERT INTO public.product VALUES ('dfbe2f7f-a75e-478e-8233-2ec844aac927', 'MacBook Air', 1199.99, 30, 'Lightweight and powerful laptop with M1 chip and long battery life.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/h67/hcc/12838921699358/652224_main.jpg_480Wx480H');
INSERT INTO public.product VALUES ('d8597a1c-8b49-45c3-83ef-506448254232', 'Dell XPS 13', 999.99, 25, 'Compact and high-performance laptop with InfinityEdge display.', NULL, 'https://m.media-amazon.com/images/I/91MXLpouhoL._AC_UF894,1000_QL80_.jpg');
INSERT INTO public.product VALUES ('40b8b914-b591-4846-ab84-d5524172f617', 'iPad Pro', 1099.99, 40, 'Powerful tablet with M1 chip and stunning Liquid Retina display.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/hc8/h01/45053056155678/480Wx480H_696687_main');
INSERT INTO public.product VALUES ('b5693a07-2acc-413f-bf2e-73a87e9f46ae', 'Microsoft Surface Pro 7', 899.99, 35, 'Versatile 2-in-1 laptop with a detachable keyboard and touchscreen.', NULL, 'https://m.media-amazon.com/images/I/717LpOK2M5L._AC_UF1000,1000_QL80_.jpg');
INSERT INTO public.product VALUES ('ae129adc-21ab-4bce-8a00-a18832f7fec8', 'Sony WH-1000XM4', 349.99, 60, 'Industry-leading noise canceling over-ear headphones.', NULL, 'https://images-cdn.ubuy.com.sa/6352adb5ce7d9021836a0465-sony-wh-1000xm4-wireless-noise-canceling.jpg');
INSERT INTO public.product VALUES ('c59e0dbb-6734-458f-889a-3f64382ac391', 'Apple Watch Series 7', 399.99, 55, 'Advanced smartwatch with fitness tracking and health monitoring.', NULL, 'https://cdnprod.mafretailproxy.com/sys-master-root/h4c/h4a/52126814535710/480Wx480H_721018_main.jpg');
INSERT INTO public.product VALUES ('b8e26eb8-42d9-4838-8532-88f177902cba', 'Amazon Echo Dot', 49.99, 100, 'Compact smart speaker with Alexa voice assistant.', NULL, 'https://m.media-amazon.com/images/I/51RcU+HQjSL._AC_SY580_.jpg');
INSERT INTO public.product VALUES ('da15485e-8c07-41a9-92bf-bd7ea6c0ba0c', 'GoPro HERO9', 399.99, 20, 'High-performance action camera with 5K video and 20MP photos.', NULL, 'https://m.media-amazon.com/images/I/51-oxgZeYiL._AC_UF1000,1000_QL80_.jpg');


--
-- TOC entry 3358 (class 0 OID 86855)
-- Dependencies: 220
-- Data for Name: product_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product_category VALUES ('fe5c2ed6-dace-49d3-8b6e-21e40f131bdc', '81bedd30-0dca-40c0-8a35-c14a94d59236', '48a092a9-1ecf-4998-a258-aaa86c574155');
INSERT INTO public.product_category VALUES ('551ee686-f0ed-4688-b7b5-31ca8390ab64', '81bedd30-0dca-40c0-8a35-c14a94d59236', 'b24c1fb1-5156-4504-9c66-e5d5ef2363c9');
INSERT INTO public.product_category VALUES ('491c9f59-9fc1-4166-9dd7-e09cd9aedba3', '81bedd30-0dca-40c0-8a35-c14a94d59236', 'dfbe2f7f-a75e-478e-8233-2ec844aac927');
INSERT INTO public.product_category VALUES ('8e49e01b-dd32-4838-beb2-de177d394ee3', '81bedd30-0dca-40c0-8a35-c14a94d59236', 'd8597a1c-8b49-45c3-83ef-506448254232');
INSERT INTO public.product_category VALUES ('c454e885-23c5-4284-a9d6-62c08ea3a948', '81bedd30-0dca-40c0-8a35-c14a94d59236', '40b8b914-b591-4846-ab84-d5524172f617');
INSERT INTO public.product_category VALUES ('81befac7-32ba-46cc-8704-e60da216dd67', '81bedd30-0dca-40c0-8a35-c14a94d59236', 'b5693a07-2acc-413f-bf2e-73a87e9f46ae');
INSERT INTO public.product_category VALUES ('e5e8878c-1441-4a6e-b4ab-c80a5914658f', '81bedd30-0dca-40c0-8a35-c14a94d59236', 'ae129adc-21ab-4bce-8a00-a18832f7fec8');
INSERT INTO public.product_category VALUES ('a9416ee7-c1de-426f-8d27-f245c9e2626f', '81bedd30-0dca-40c0-8a35-c14a94d59236', 'c59e0dbb-6734-458f-889a-3f64382ac391');
INSERT INTO public.product_category VALUES ('4285fcd7-81c8-449d-b9f5-47797b9ad02b', '81bedd30-0dca-40c0-8a35-c14a94d59236', 'b8e26eb8-42d9-4838-8532-88f177902cba');
INSERT INTO public.product_category VALUES ('04373e50-3bf9-462b-94c9-ddc0b7cadba4', '81bedd30-0dca-40c0-8a35-c14a94d59236', 'da15485e-8c07-41a9-92bf-bd7ea6c0ba0c');


-- Completed on 2024-05-31 22:34:48

--
-- PostgreSQL database dump complete
--

