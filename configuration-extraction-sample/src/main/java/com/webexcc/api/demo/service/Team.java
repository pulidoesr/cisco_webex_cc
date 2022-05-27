package com.webexcc.api.demo.service;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.MapperFeature;
import com.webexcc.api.demo.util.ExportUtil;

public class Team extends ApiService {
	static Logger logger = LoggerFactory.getLogger(Team.class);

	public Team() {
	}

	void getAllTeams(int page, int pageSize, List<com.webexcc.api.demo.model.Team> list) throws Exception {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + access_token);
			HttpEntity<?> entity = new HttpEntity<String>(null, headers);
			ResponseEntity<String> response1 = restTemplate.exchange(baseURL + "/" + orginzationId + "/team?page=" + page + "&pageSize=" + pageSize, HttpMethod.GET, entity, String.class);
			JSONArray jsonArray = new JSONArray(response1.getBody());
			logger.info("\n{}", jsonArray.toString(4));

			om.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);
			List<com.webexcc.api.demo.model.Team> o = om.readValue(response1.getBody(), new TypeReference<List<com.webexcc.api.demo.model.Team>>() {
			});
			logger.info("page:{}\tTeam:{}", page, o.size());
			list.addAll(o);
			if (!"[]".equals(response1.getBody())) {
				getAllTeams(++page, pageSize, list);
			}
		} catch (Exception e) {
			if (e.getMessage().startsWith("429 Too Many Requests")) {
				logger.warn("Too Many Requests so take a nap for 1 minute.");
				try {
					Thread.sleep(60000);
				} catch (InterruptedException e1) {
				}
				getAllTeams(page, pageSize, list);
			}
			throw e;
		}
	}

	void getTeamById(String id) throws Exception {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + access_token);
			HttpEntity<?> entity = new HttpEntity<String>(null, headers);
			ResponseEntity<String> response1 = restTemplate.exchange(baseURL + "/" + orginzationId + "/team/" + id, HttpMethod.GET, entity, String.class);
			JSONObject json = new JSONObject(response1.getBody());
			logger.info("\n{}", json.toString(4));

			om.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);
			com.webexcc.api.demo.model.Team o = om.readValue(response1.getBody(), com.webexcc.api.demo.model.Team.class);
			logger.info("Team:{}", o);

		} catch (Exception e) {
			if (e.getMessage().startsWith("429 Too Many Requests")) {
				logger.warn("Too Many Requests so take a nap for 1 minute.");
				try {
					Thread.sleep(60000);
				} catch (InterruptedException e1) {
				}
				getTeamById(id);
			}
			throw e;
		}
	}

	public static void main(String[] args) {
		try {
			List<com.webexcc.api.demo.model.Team> list = new ArrayList<com.webexcc.api.demo.model.Team>();

			// get all
			new Team().getAllTeams(0, 22, list);
			logger.info("list size:{}", list.size());

			// get one
			new Team().getTeamById("AXYkkv__pxttOlBXBhBf");

			// export to CSV
			BufferedWriter writer = new BufferedWriter(new FileWriter("Team.csv"));
			ExportUtil.toCsv(writer, list);
			writer.close();

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
