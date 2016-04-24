package UCOCampusMapService;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.inject.Named;
import javax.enterprise.context.Dependent;
import javax.sql.DataSource;
import org.primefaces.model.map.DefaultMapModel;
import org.primefaces.model.map.LatLng;
import org.primefaces.model.map.MapModel;

/**
 *
 * @author Derek
 */
@Named(value = "googleMapController")
@Dependent
public class GoogleMapController {
    
    
    @Resource(name = "jdbc/db1")
    private DataSource ds;    
    private String googleAPIKey;
    private MapModel mapModel;
    
    /**
     * 
     */
    private List<Building> buildings;

    /**
     * 
     */
    private CampusMap campusMap;

    /**
     * 
     */
    private Navigator navigator;
    
    @PostConstruct
    public void postInit() {
        this.googleAPIKey = "AIzaSyDmsfk9pYvadQRNh2Wu6d_xbBk99xcTGQo";
        this.mapModel = new DefaultMapModel();
    }


    /**
     * @param destination 
     * @return
     */
    public MapView navigateTo(LatLng destination) {
        // TODO implement here
        return null;
    }
    
    public List<Building> getBuildings() throws SQLException {
        List<Building> buildings = new ArrayList<>();
        
        if (ds == null) {
            throw new SQLException("ds is null; Can't get data source");
        }

        Connection conn = ds.getConnection();

        if (conn == null) {
            throw new SQLException("conn is null; Can't get db connection");
        }
        
        try {
            PreparedStatement ps = conn.prepareStatement("select * from"
                    + " buildings");
            ResultSet rs = ps.executeQuery();
            
            while(rs.next()) {
                Building b = new Building();
                b.setName(rs.getString("building_name"));
                b.setLocation(new LatLng(rs.getFloat("latitude"), 
                        rs.getFloat("longitude")));
                buildings.add(b);
            }
        } finally {
            conn.close();
        }
        return buildings;
    }

    public String getGoogleAPIKey() {
        return googleAPIKey;
    }

    public void setGoogleAPIKey(String googleAPIKey) {
        this.googleAPIKey = googleAPIKey;
    }

    public MapModel getMapModel() {
        return mapModel;
    }

    public void setMapModel(MapModel mapModel) {
        this.mapModel = mapModel;
    }
    
}
